<?php

// use Illuminate\Support\Facades\Route;

// Route::get('/test', function () {
//     return response()->json([
//         'message' => 'API works'
//     ]);
// });

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/posts', [PostController::class, 'index']);
Route::post('/posts', [PostController::class, 'store']);
