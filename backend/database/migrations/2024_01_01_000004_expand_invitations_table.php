<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invitations', function (Blueprint $table) {
            // Mempelai - foto
            $table->string('groom_photo')->default('')->after('groom_mother');
            $table->string('bride_photo')->default('')->after('bride_mother');

            // Hero / Opening
            $table->string('hero_bg_photo')->default('')->after('cover_photo');
            $table->string('hero_subtitle')->default('')->after('hero_bg_photo');

            // Gallery (JSON array of paths)
            $table->json('gallery_photos')->nullable()->after('hero_subtitle');

            // Love story (JSON array of {title, date, desc, photo})
            $table->json('love_stories')->nullable()->after('love_story');

            // Countdown
            $table->string('countdown_date')->default('')->after('love_stories');

            // RSVP
            $table->boolean('rsvp_enabled')->default(true)->after('countdown_date');
            $table->integer('rsvp_limit')->nullable()->after('rsvp_enabled');

            // Wedding gift
            $table->json('bank_accounts')->nullable()->after('rsvp_limit');
            $table->string('qris_photo')->default('')->after('bank_accounts');
            $table->string('gift_address')->default('')->after('qris_photo');

            // Wishes
            $table->boolean('wishes_enabled')->default(true)->after('gift_address');

            // Music
            $table->string('music_title')->default('')->after('music_url');
            $table->boolean('music_autoplay')->default(true)->after('music_title');

            // SEO
            $table->string('seo_title')->default('')->after('music_autoplay');
            $table->string('seo_description')->default('')->after('seo_title');
            $table->string('seo_thumbnail')->default('')->after('seo_description');
        });
    }

    public function down(): void
    {
        Schema::table('invitations', function (Blueprint $table) {
            $table->dropColumn([
                'groom_photo','bride_photo','hero_bg_photo','hero_subtitle',
                'gallery_photos','love_stories','countdown_date',
                'rsvp_enabled','rsvp_limit','bank_accounts','qris_photo','gift_address',
                'wishes_enabled','music_title','music_autoplay',
                'seo_title','seo_description','seo_thumbnail',
            ]);
        });
    }
};
