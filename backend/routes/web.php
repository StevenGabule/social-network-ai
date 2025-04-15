<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('web')->group(function () {
    Route::get('twitter/redirect', [AuthController::class, 'redirectToProvider']);
    Route::get('twitter/callback', [AuthController::class, 'handleProviderCallback']);
    Route::get('x/redirect', [AuthController::class, 'redirectToProvider']);
    Route::get('x/callback', [AuthController::class, 'handleProviderCallback']);
});
