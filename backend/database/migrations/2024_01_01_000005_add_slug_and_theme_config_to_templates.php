<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('templates', function (Blueprint $table) {
            // slug unik untuk routing dinamis: "sandhya", "nisha", "aurora", dll
            $table->string('slug', 100)->unique()->nullable()->after('name');
            // Konfigurasi visual tema (warna, font, dekorasi, dll) — JSON
            $table->json('theme_config')->nullable()->after('is_promo');
            // Deskripsi singkat tema
            $table->string('description', 300)->default('')->after('slug');
        });
    }

    public function down(): void
    {
        Schema::table('templates', function (Blueprint $table) {
            $table->dropColumn(['slug', 'theme_config', 'description']);
        });
    }
};
