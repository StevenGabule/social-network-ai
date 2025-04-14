<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\{NotFoundHttpException,MethodNotAllowedHttpException};
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Throwable;

class Handler extends ExceptionHandler
{

    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation'
    ];

    public function register() : void
    {
        $this->reportable(function(Throwable $e) {});

        // custom exception rendering for api requests
        $this->renderable(function(Throwable $e, $request) {
            if($request->is('api/*') || $request->wantsJson()) {
                return $this->handleApiException($e, $request);
            }
        });
    }

    /**
     * Handle API exceptions
     *
     * @param Throwable $exception
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    private function handleApiException(Throwable $exception, $request) : JsonResponse
    {
        // default values
        $statusCode = 500;
        $message = 'Internal server error';
        $errors = null;

        // handle different exception types
        if($exception instanceof AuthenticationException) {
            $statusCode = 401;
            $message = 'Unauthenticated';
        } elseif($exception instanceof ValidationException) {
            $statusCode = 422;
            $message = 'Validation error';
            $errors = $exception->validator->errors()->toArray();
        } elseif($exception instanceof ModelNotFoundException) {
            $statusCode = 404;
            $model = strtolower(class_basename($exception->getModel()));
            $message = "Unable to find {$model} with the given identifier.";
        } elseif($exception instanceof NotFoundHttpException) {
            $statusCode = 404;
            $message = 'The requested endpoint does not exist.';
        } elseif($exception instanceof MethodNotAllowedException) {
            $statusCode = 405;
            $message = 'The method specified in the request is not allowed';
        }


        // Create a standardized response
        $response = [
            'success' => false,
            'message' => $message
        ];

        if(!empty($errors)) {
            $response['errors'] = $errors;
        }

        // Add debug information in development environment
        if (config('app.debug')) {
            $response['debug'] = [
                'exception' => get_class($exception),
                'trace' => $exception->getTrace()
            ];
        }

        return response()->json($response, $statusCode);
    }
}
