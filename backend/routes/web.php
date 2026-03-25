<?php

use Illuminate\Support\Facades\Route;

Route::get('/admin/login', function () {
    return ['message' => 'Admin login page'];
});

Route::get('/admin', function () {
    return ['message' => 'Admin dashboard'];
});

Route::get('/', function () {
    return ['message' => 'Adversity Store API'];
});
