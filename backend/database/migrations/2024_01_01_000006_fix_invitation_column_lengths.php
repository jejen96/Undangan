<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Fix invitation column lengths using raw SQL.
 * Using raw SQL instead of Schema::table->change() to avoid doctrine/dbal dependency.
 *
 * Root cause: Several columns were varchar(255) but validation rules
 * allowed up to 500 chars, causing DB truncation/errors on save.
 */
return new class extends Migration
{
    public function up(): void
    {
        // TEXT columns cannot have DEFAULT in MySQL — use NULL instead
        DB::statement('ALTER TABLE invitations MODIFY COLUMN akad_address TEXT NULL');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN resepsi_address TEXT NULL');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN gift_address TEXT NULL');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN opening_quote TEXT NULL');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN seo_description TEXT NULL');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN akad_maps_url VARCHAR(1000) NOT NULL DEFAULT ""');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN resepsi_maps_url VARCHAR(1000) NOT NULL DEFAULT ""');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN music_url VARCHAR(1000) NOT NULL DEFAULT ""');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN hero_subtitle VARCHAR(500) NOT NULL DEFAULT ""');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE invitations MODIFY COLUMN akad_address VARCHAR(255) NOT NULL DEFAULT ""');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN resepsi_address VARCHAR(255) NOT NULL DEFAULT ""');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN gift_address VARCHAR(255) NOT NULL DEFAULT ""');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN opening_quote VARCHAR(255) NOT NULL DEFAULT ""');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN seo_description VARCHAR(255) NOT NULL DEFAULT ""');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN akad_maps_url VARCHAR(255) NOT NULL DEFAULT ""');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN resepsi_maps_url VARCHAR(255) NOT NULL DEFAULT ""');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN music_url VARCHAR(255) NOT NULL DEFAULT ""');
        DB::statement('ALTER TABLE invitations MODIFY COLUMN hero_subtitle VARCHAR(255) NOT NULL DEFAULT ""');
    }
};
