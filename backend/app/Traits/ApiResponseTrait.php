<?php

namespace App\Traits;

use function PHPUnit\Framework\isNull;

trait ApiResponseTrait
{
    /**
     * Success Response
     *
     * @param mixed $data
     * @param string $message
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public function successResponse($data =  null, string $message = 'Operation successful', int $statusCode = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ]);
    }

    /**
     * Error Response
     *
     * @param string $message
     * @param mixed $errors
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public function errorResponse(string $message = 'An error occurred', $errors = null, int $statusCode = 400)
    {
        $response = [
            'success' => false,
            'message' => $message
        ];

        if (!isNull($errors)) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Unauthorized Response
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function unauthorizedResponse(string $message = 'Unauthorized')
    {
        return $this->errorResponse($message, null, 401);
    }

    /**
     * Forbidden Response
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function forbiddenResponse(string $message = 'Forbidden')
    {
        return $this->errorResponse($message, null, 403);
    }

    /**
     * Not Found Response
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function notFoundResponse(string $message = 'Not Found')
    {
        return $this->errorResponse($message, null, 404);
    }

    /**
     * Validation Error Response
     *
     * @param mixed $errors
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function validationErrorResponse(mixed $errors, string $message = 'Validation Error')
    {
        return $this->errorResponse($message, $errors, 422);
    }
}
