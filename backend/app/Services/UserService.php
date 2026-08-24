<?php

namespace App\Services;

use App\Models\User;
use App\Mail\WelcomeMail;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class UserService
{
    /** @var PasswordGeneratorService */
    private $passwordGenerator;

    public function __construct(PasswordGeneratorService $passwordGenerator)
    {
        $this->passwordGenerator = $passwordGenerator;
    }

    /**
     * Registrasi user baru
     */
    public function register(array $data): array
    {
        $plainPassword = $this->passwordGenerator->generate($data['full_name']);

        $user = User::create([
            'full_name' => $data['full_name'],
            'email'     => $data['email'],
            'whatsapp'  => $data['whatsapp'],
            'password'  => Hash::make($plainPassword),
            'is_active' => true,
        ]);

        // DEV LOG — hapus saat production
        Log::info('=== REGISTER PASSWORD ===', [
            'name'     => $user->full_name,
            'email'    => $user->email,
            'password' => $plainPassword,
        ]);

        try {
            Mail::to($user->email)->send(new WelcomeMail($user, $plainPassword));
        } catch (\Exception $e) {
            Log::warning('Welcome email gagal terkirim: ' . $e->getMessage());
        }

        return ['user' => $user, 'plain_password' => $plainPassword];
    }

    /**
     * Reset password user
     */
    public function resetPassword(string $email): array
    {
        $user = User::where('email', $email)->first();

        if (! $user) {
            return ['success' => false, 'message' => 'Email tidak ditemukan.'];
        }

        $newPassword = $this->passwordGenerator->generate($user->full_name);
        $user->update(['password' => Hash::make($newPassword)]);

        // DEV LOG — hapus saat production
        Log::info('=== RESET PASSWORD ===', [
            'name'         => $user->full_name,
            'email'        => $user->email,
            'new_password' => $newPassword,
        ]);

        try {
            Mail::to($user->email)->send(new ResetPasswordMail($user, $newPassword));
        } catch (\Exception $e) {
            Log::warning('Reset password email gagal terkirim: ' . $e->getMessage());
        }

        return ['success' => true, 'message' => 'Password baru telah dikirim ke email Anda.'];
    }
}
