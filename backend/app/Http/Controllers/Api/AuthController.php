<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /** @var UserService */
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /* ------------------------------------------------------------------ */
    /*  POST /api/auth/register                                             */
    /* ------------------------------------------------------------------ */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:100'],
            'email'     => ['required', 'email', 'unique:users,email'],
            'whatsapp'  => ['required', 'string', 'max:20'],
        ]);

        $result = $this->userService->register($validated);

        return response()->json([
            'message' => 'Registrasi berhasil! Cek email Anda untuk informasi akun.',
            'user'    => [
                'id'        => $result['user']->id,
                'full_name' => $result['user']->full_name,
                'email'     => $result['user']->email,
            ],
        ], 201);
    }

    /* ------------------------------------------------------------------ */
    /*  POST /api/auth/login                                                */
    /* ------------------------------------------------------------------ */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            throw ValidationException::withMessages([
                'email' => ['Email belum terdaftar.'],
            ]);
        }

        if (! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'password' => ['Password salah.'],
            ]);
        }

        if (! $user->is_active) {
            return response()->json(['message' => 'Akun Anda tidak aktif.'], 403);
        }

        // Hapus token lama, buat yang baru
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil.',
            'token'   => $token,
            'user'    => [
                'id'        => $user->id,
                'full_name' => $user->full_name,
                'email'     => $user->email,
                'whatsapp'  => $user->whatsapp,
            ],
        ]);
    }

    /* ------------------------------------------------------------------ */
    /*  POST /api/auth/logout                                               */
    /* ------------------------------------------------------------------ */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout berhasil.']);
    }

    /* ------------------------------------------------------------------ */
    /*  GET /api/auth/me                                                    */
    /* ------------------------------------------------------------------ */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'id'        => $user->id,
            'full_name' => $user->full_name,
            'email'     => $user->email,
            'whatsapp'  => $user->whatsapp,
        ]);
    }

    /* ------------------------------------------------------------------ */
    /*  POST /api/auth/forgot-password                                      */
    /* ------------------------------------------------------------------ */
    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $result = $this->userService->resetPassword($request->email);

        return response()->json(['message' => $result['message']]);
    }
}
