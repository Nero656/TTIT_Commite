<?php

use App\Http\Controllers\categoryController;
use App\Http\Controllers\orderController;
use App\Http\Controllers\requestController;
use App\Http\Controllers\userController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::prefix('/user')->group(function (){
    Route::post('/registration', [UserController::class, 'store']);
    Route::post('/auth', [UserController::class, 'auth']);
    Route::get('/profList', [UserController::class, 'profList']);
    Route::get('/person/{user}', [UserController::class, 'showUser']);
    Route::middleware('auth:api')->get('/studList', [UserController::class, 'studList']);
    Route::middleware('auth:api')->get('/show', [UserController::class, 'show']);
    Route::middleware('auth:api')->patch('/update/{user}', [UserController::class, 'update']);
    Route::middleware('auth:api')->post('/logout', [UserController::class, 'logout']);
});

Route::prefix('/category')->group(function (){
   Route::get('/all', [categoryController::class, 'index']);
   Route::get('/{category}', [categoryController::class, 'show']);
   Route::middleware('auth:api')->post('/', [categoryController::class, 'store']);
   Route::middleware('auth:api')->patch('/{category}', [categoryController::class, 'update']);
   Route::middleware('auth:api')->delete('/{category}', [categoryController::class, 'delete']);
});

Route::prefix('/requests')->group(function (){
    Route::middleware('auth:api')->get('/all', [requestController::class, 'index']);
    Route::middleware('auth:api')->post('/ReqList', [requestController::class, 'UserReqList']);
    Route::middleware('auth:api')->get('/{request}', [requestController::class, 'show']);
    Route::middleware('auth:api')->post('/', [requestController::class, 'store']);
    Route::middleware('auth:api')->patch('/{request}', [requestController::class, 'update']);
    Route::middleware('auth:api')->delete('/{request}', [requestController::class, 'delete']);
});

Route::prefix('/orders')->group(function (){
    Route::middleware('auth:api')->get('/all', [orderController::class, 'index']);
    Route::middleware('auth:api')->get('/{order}', [orderController::class, 'show']);
    Route::middleware('auth:api')->post('/userOrder', [orderController::class, 'UserOrderList']);
    Route::middleware('auth:api')->post('/', [orderController::class, 'store']);
    Route::middleware('auth:api')->patch('/{order}', [orderController::class, 'update']);
    Route::middleware('auth:api')->delete('/{order}', [orderController::class, 'delete']);
});

