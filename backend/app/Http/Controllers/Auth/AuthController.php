<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseApiController;
use App\Http\Requests\Auth\{ForgotPasswordRequest, LoginRequest, RegisterRequest, ResetPasswordRequest};
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Auth, Hash, Password};
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Str;

class AuthController extends BaseApiController
{
    /**
     * Register a new user
     *
     * @param RegisterRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('AuthToken')->accessToken;

        return $this->successResponse([
            'user' => new UserResource($user),
            'token' => $token,
        ], 'User registered successfully', 201);
    }

    /**
     * Login user and create token
     *
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('AuthToken')->accessToken;
            return $this->successResponse([
                'user' => new UserResource($user),
                'token' => $token
            ], 'Login successful.');
        } else {
            return $this->unauthorizedResponse('Invalid credentials.');
        }
    }

    /**
     * Logout user (Revoke the token)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return $this->successResponse(null, 'Successfully logged out.');
    }

    /**
     * Get authenticated user profile
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile(Request $request)
    {
        return $this->successResponse(new UserResource($request->user()));
    }

    /**
     * Send a reset link to the given user.
     *
     * @param  ForgotPasswordRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $status = Password::sendResetLink($request->only('email'));

        if ($status === PASSWORD::RESET_LINK_SENT) {
            return $this->successResponse(null, 'Password reset link sent to your email');
        }

        return $this->errorResponse(trans($status), null, 400);
    }

    /**
     * Reset the given user's password.
     *
     * @param  ResetPasswordRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request) {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if($status === Password::PASSWORD_RESET) {
            return $this->successResponse(null, 'Password has been successfully reset.');
        }

        return $this->errorResponse(trans($status), null, 400);
    }
}
