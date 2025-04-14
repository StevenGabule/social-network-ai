<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\{Exceptions, Middleware};

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'api' => \App\Http\Middleware\ApiResponseFormatter::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (Throwable $exception, Request $request) {
            if ($request->is('api/*') || $request->wantsJson()) {

                \Log::info('Exception caught', [get_class($exception)]);

                $statusCode = 500;
                $message = 'Internal server error';
                $errors = null;

                // Handle different exception types
                if ($exception instanceof AuthenticationException) {
                    $statusCode = 401;
                    $message = 'Unauthenticated';
                } elseif ($exception instanceof ValidationException) {
                    $statusCode = 422;
                    $message = 'Validation error';
                    $errors = $exception->validator->errors()->toArray();
                } elseif ($exception instanceof ModelNotFoundException) {
                    $statusCode = 404;
                    $model = strtolower(class_basename($exception->getModel()));
                    $message = "Unable to find {$model} with the given identifier";
                } elseif ($exception instanceof NotFoundHttpException) {
                    $statusCode = 404;
                    $message = 'The requested endpoint does not exist';
                } elseif ($exception instanceof MethodNotAllowedHttpException) {
                    $statusCode = 405;
                    $message = 'The method specified in the request is not allowed';
                }

                // Create a standardized response
                $response = [
                    'success' => false,
                    'message' => $message
                ];

                // Add errors if available
                if (!empty($errors)) {
                    $response['errors'] = $errors;
                }

                // Add debug information in development environment
                // if (config('app.debug')) {
                //     $response['debug'] = [
                //         'exception' => get_class($exception),
                //         'trace' => $exception->getTrace()
                //     ];
                // }

                return response()->json($response, $statusCode);
            }
        });
    })->create();
