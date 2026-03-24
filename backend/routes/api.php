<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;

Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);

        Route::get('/inventory', [ProductController::class, 'index']);
        Route::post('/inventory', [ProductController::class, 'store']);
        Route::get('/inventory/{product}', [ProductController::class, 'show']);
        Route::put('/inventory/{product}', [ProductController::class, 'update']);
        Route::delete('/inventory/{product}', [ProductController::class, 'destroy']);
    });
});
