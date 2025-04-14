<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiResponseFormatter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Add Accept header to force JSON response
        $request->headers->set('Accept', 'application/json');

        // Get the response
        $response = $next($request);

        // If it's already a JsonResponse, we'll standardize it
        if ($response instanceof JsonResponse) {
            $data  = $response->getData(true);

            // if response isn't already formatted, format it
            if (!isset($data['success'])) {
                $originalData = $data;
                $data = [
                    'success' => $response->getStatusCode() < 400,
                    'data' => $originalData
                ];

                $response->setData($data);
            }
        }

        return $response;
    }
}
