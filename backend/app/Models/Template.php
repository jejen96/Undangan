<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Template extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'category',
        'has_photo',
        'preview_image',
        'edit_url',
        'is_promo',
        'theme_config',
    ];

    protected $casts = [
        'has_photo'    => 'boolean',
        'is_promo'     => 'boolean',
        'theme_config' => 'array',
    ];

    /** Auto-generate slug dari name jika tidak diisi */
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->name);
            }
        });
    }
}
