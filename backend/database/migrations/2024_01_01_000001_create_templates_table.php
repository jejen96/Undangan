<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('templates', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->enum('category', ['elegant', 'immersive', 'spesial'])->default('elegant');
            $table->boolean('has_photo')->default(true);
            $table->string('preview_image', 500)->default('');
            $table->string('edit_url', 500)->default('');
            $table->boolean('is_promo')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('templates');
    }
};
