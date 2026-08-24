<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('template_id')->nullable()->constrained()->nullOnDelete();
            $table->string('slug', 36)->unique(); // UUID

            // Data mempelai
            $table->string('groom_name')->default('');
            $table->string('groom_nickname')->default('');
            $table->string('groom_father')->default('');
            $table->string('groom_mother')->default('');
            $table->string('bride_name')->default('');
            $table->string('bride_nickname')->default('');
            $table->string('bride_father')->default('');
            $table->string('bride_mother')->default('');

            // Acara Akad
            $table->string('akad_date')->default('');
            $table->string('akad_time')->default('');
            $table->string('akad_venue')->default('');
            $table->string('akad_address')->default('');
            $table->string('akad_maps_url')->default('');

            // Acara Resepsi
            $table->string('resepsi_date')->default('');
            $table->string('resepsi_time')->default('');
            $table->string('resepsi_venue')->default('');
            $table->string('resepsi_address')->default('');
            $table->string('resepsi_maps_url')->default('');

            // Konten
            $table->text('love_story')->nullable();
            $table->string('opening_quote')->default('');
            $table->string('music_url')->default('');
            $table->string('cover_photo')->default(''); // path upload

            // Status
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};
