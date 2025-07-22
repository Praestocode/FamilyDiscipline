<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SmokeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\TasksController;
use App\Http\Controllers\Api\WeightController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    //User
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user', [UserController::class, 'show']);
    Route::get('/users/points-history', [UserController::class, 'pointsHistory']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/statuses', [StatusController::class, 'index']);
    Route::post('/user/change-password', [UserController::class, 'changePassword']); //Nuova rotta
    //Smoke
    Route::get('/smoke', [SmokeController::class, 'getStatus']);
    Route::post('/smoke/increment', [SmokeController::class, 'increment']);
    Route::post('/smoke/decrement', [SmokeController::class, 'decrement']);
    Route::post('/smoke/process-daily', [SmokeController::class, 'processDaily']);
    //Weight
    Route::get('/weight', [WeightController::class, 'getStatus']);
    Route::post('/weight/update', [WeightController::class, 'updateWeights']);
    Route::post('/weight/daily', [WeightController::class, 'updateCurrentWeight']);
    Route::delete('/weight/reset', [WeightController::class, 'resetWeights']);
    //Tasks
    Route::get('/tasks', [TasksController::class, 'getStatus']);
    Route::post('/tasks/create', [TasksController::class, 'createTask']);
    Route::post('/tasks/update', [TasksController::class, 'updateTask']);
    Route::delete('/tasks/delete/{id}', [TasksController::class, 'deleteTask']);
    Route::post('/tasks/complete', [TasksController::class, 'completeTask']);
    Route::delete('/tasks/reset/{type}', [TasksController::class, 'resetTasks']);
    Route::post('/tasks/update-all', [TasksController::class, 'updateAllTasks']); //Nuova rotta
});