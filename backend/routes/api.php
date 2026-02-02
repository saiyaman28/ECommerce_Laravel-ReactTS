<?php

// use Illuminate\Support\Facades\Route;

// Route::get('/test', function () {
//     return response()->json([
//         'message' => 'API works'
//     ]);
// });

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Api\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/posts', [PostController::class, 'index']);
Route::post('/posts', [PostController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});