<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InvitationResource extends JsonResource
{
    public function toArray($request): array
    {
        $storage = fn($p) => $p ? asset('storage/' . $p) : null;

        return [
            'id'              => $this->id,
            'slug'            => $this->slug,
            'template_id'     => $this->template_id,

            // Mempelai
            'groom_name'      => $this->groom_name,
            'groom_nickname'  => $this->groom_nickname,
            'groom_father'    => $this->groom_father,
            'groom_mother'    => $this->groom_mother,
            'groom_photo'     => $storage($this->groom_photo),
            'bride_name'      => $this->bride_name,
            'bride_nickname'  => $this->bride_nickname,
            'bride_father'    => $this->bride_father,
            'bride_mother'    => $this->bride_mother,
            'bride_photo'     => $storage($this->bride_photo),

            // Hero
            'hero_bg_photo'   => $storage($this->hero_bg_photo),
            'hero_subtitle'   => $this->hero_subtitle,
            'opening_quote'   => $this->opening_quote,
            'cover_photo'     => $storage($this->cover_photo),

            // Akad
            'akad_date'       => $this->akad_date,
            'akad_time'       => $this->akad_time,
            'akad_venue'      => $this->akad_venue,
            'akad_address'    => $this->akad_address,
            'akad_maps_url'   => $this->akad_maps_url,

            // Resepsi
            'resepsi_date'    => $this->resepsi_date,
            'resepsi_time'    => $this->resepsi_time,
            'resepsi_venue'   => $this->resepsi_venue,
            'resepsi_address' => $this->resepsi_address,
            'resepsi_maps_url'=> $this->resepsi_maps_url,

            // Countdown
            'countdown_date'  => $this->countdown_date,

            // Love story
            'love_story'      => $this->love_story,
            'love_stories'    => $this->love_stories ?? [],

            // Gallery
            'gallery_photos'  => $this->gallery_photos ?? [],

            // RSVP
            'rsvp_enabled'    => (bool)$this->rsvp_enabled,
            'rsvp_limit'      => $this->rsvp_limit,

            // Gift
            'bank_accounts'   => $this->bank_accounts ?? [],
            'qris_photo'      => $storage($this->qris_photo),
            'gift_address'    => $this->gift_address,

            // Wishes
            'wishes_enabled'  => (bool)$this->wishes_enabled,

            // Music
            'music_url'       => $this->music_url,
            'music_title'     => $this->music_title,
            'music_autoplay'  => (bool)$this->music_autoplay,

            // SEO
            'seo_title'       => $this->seo_title,
            'seo_description' => $this->seo_description,
            'seo_thumbnail'   => $storage($this->seo_thumbnail),

            'status'          => $this->status,
            'updated_at'      => $this->updated_at?->toDateTimeString(),
        ];
    }
}
