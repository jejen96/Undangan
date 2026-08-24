<?php

namespace App\Services;

class PasswordGeneratorService
{
    private static $specialChars = ['!', '@', '#', '$', '%', '&', '*'];

    /**
     * Generate password: NamaDepan + 2 digit angka acak + 1 karakter spesial acak
     * Contoh: "Jejen Jaenudin" → "Jejen42!"
     */
    public function generate(string $fullName): string
    {
        $firstName = explode(' ', trim($fullName))[0];
        $digits    = str_pad((string) random_int(10, 99), 2, '0', STR_PAD_LEFT);
        $special   = self::$specialChars[array_rand(self::$specialChars)];

        return $firstName . $digits . $special;
    }
}
