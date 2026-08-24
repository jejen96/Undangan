<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TemplateController;
use App\Http\Controllers\Api\InvitationController;

/*
|--------------------------------------------------------------------------
| API Routes — UndangTeman.id
|--------------------------------------------------------------------------
*/

// ── Public routes ──────────────────────────────────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('/register',        [AuthController::class, 'register']);
    Route::post('/login',           [AuthController::class, 'login']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
});

// Templates (public — bisa dilihat tanpa login)
Route::get('/templates',                     [TemplateController::class, 'index']);
Route::get('/templates/by-slug/{slug}',      [TemplateController::class, 'showBySlug']);
Route::get('/templates/{id}',                [TemplateController::class, 'show'])->where('id', '[0-9]+');

// Health check
Route::get('/health', fn () => response()->json(['status' => 'ok', 'service' => 'UndangTeman.id API']));

// ── Protected routes (perlu token) ─────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);

    // Invitations
    Route::get('/invitations',                           [InvitationController::class, 'index']);
    Route::post('/invitations',                          [InvitationController::class, 'store']);
    Route::get('/invitations/{slug}',                    [InvitationController::class, 'show']);
    Route::put('/invitations/{slug}',                    [InvitationController::class, 'update']);
    Route::delete('/invitations/{slug}',                 [InvitationController::class, 'destroy']);
    Route::post('/invitations/{slug}/upload-photo',      [InvitationController::class, 'uploadPhoto']);
    Route::post('/invitations/{slug}/upload-gallery',    [InvitationController::class, 'uploadGallery']);
    Route::post('/invitations/{slug}/delete-gallery',    [InvitationController::class, 'deleteGalleryPhoto']);
});
