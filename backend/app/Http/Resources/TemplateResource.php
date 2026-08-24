<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TemplateResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'            => $this->id,
            'name'          => $this->name,
            'slug'          => $this->slug,
            'description'   => $this->description,
            'category'      => $this->category,
            'has_photo'     => (bool) $this->has_photo,
            'preview_image' => $this->preview_image,
            'edit_url'      => $this->edit_url,
            'is_promo'      => (bool) $this->is_promo,
            'theme_config'  => $this->theme_config ?? [],
        ];
    }
}
