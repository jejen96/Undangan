<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'template_id', 'slug',
        'groom_name', 'groom_nickname', 'groom_father', 'groom_mother', 'groom_photo',
        'bride_name', 'bride_nickname', 'bride_father', 'bride_mother', 'bride_photo',
        'akad_date', 'akad_time', 'akad_venue', 'akad_address', 'akad_maps_url',
        'resepsi_date', 'resepsi_time', 'resepsi_venue', 'resepsi_address', 'resepsi_maps_url',
        'love_story', 'love_stories', 'opening_quote', 'music_url', 'music_title', 'music_autoplay',
        'cover_photo', 'hero_bg_photo', 'hero_subtitle',
        'gallery_photos', 'countdown_date',
        'rsvp_enabled', 'rsvp_limit',
        'bank_accounts', 'qris_photo', 'gift_address',
        'wishes_enabled',
        'seo_title', 'seo_description', 'seo_thumbnail',
        'status', 'is_active',
    ];

    protected $casts = [
        'is_active'      => 'boolean',
        'rsvp_enabled'   => 'boolean',
        'wishes_enabled' => 'boolean',
        'music_autoplay' => 'boolean',
        'gallery_photos' => 'array',
        'love_stories'   => 'array',
        'bank_accounts'  => 'array',
        'rsvp_limit'     => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function template()
    {
        return $this->belongsTo(Template::class);
    }

    /** Auto-generate slug UUID saat membuat */
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = (string) Str::uuid();
            }
        });
    }
}
