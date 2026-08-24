<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\InvitationResource;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class InvitationController extends Controller
{
    public function index(Request $request)
    {
        $invitations = Invitation::with('template')
            ->where('user_id', $request->user()->id)
            ->orderByDesc('updated_at')->get();
        return InvitationResource::collection($invitations);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate(['template_id' => ['nullable', 'exists:templates,id']]);
        $invitation = Invitation::create([
            'user_id'     => $request->user()->id,
            'template_id' => $validated['template_id'] ?? null,
            'status'      => 'draft',
            'rsvp_enabled'   => true,
            'wishes_enabled' => true,
            'music_autoplay' => true,
        ]);
        $invitation->load('template');
        return response()->json(new InvitationResource($invitation), 201);
    }

    public function show(Request $request, string $slug)
    {
        $invitation = Invitation::with('template')
            ->where('slug', $slug)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();
        return new InvitationResource($invitation);
    }

    public function update(Request $request, string $slug): JsonResponse
    {
        $invitation = Invitation::where('slug', $slug)
            ->where('user_id', $request->user()->id)->firstOrFail();

        $validated = $request->validate([
            'template_id'     => ['nullable', 'exists:templates,id'],
            'groom_name'      => ['nullable', 'string', 'max:100'],
            'groom_nickname'  => ['nullable', 'string', 'max:50'],
            'groom_father'    => ['nullable', 'string', 'max:100'],
            'groom_mother'    => ['nullable', 'string', 'max:100'],
            'bride_name'      => ['nullable', 'string', 'max:100'],
            'bride_nickname'  => ['nullable', 'string', 'max:50'],
            'bride_father'    => ['nullable', 'string', 'max:100'],
            'bride_mother'    => ['nullable', 'string', 'max:100'],
            'akad_date'       => ['nullable', 'string', 'max:30'],
            'akad_time'       => ['nullable', 'string', 'max:30'],
            'akad_venue'      => ['nullable', 'string', 'max:200'],
            'akad_address'    => ['nullable', 'string'],
            'akad_maps_url'   => ['nullable', 'string', 'max:1000'],
            'resepsi_date'    => ['nullable', 'string', 'max:30'],
            'resepsi_time'    => ['nullable', 'string', 'max:30'],
            'resepsi_venue'   => ['nullable', 'string', 'max:200'],
            'resepsi_address' => ['nullable', 'string'],
            'resepsi_maps_url'=> ['nullable', 'string', 'max:1000'],
            'love_story'      => ['nullable', 'string'],
            'love_stories'    => ['nullable', 'array'],
            'opening_quote'   => ['nullable', 'string'],
            'hero_subtitle'   => ['nullable', 'string', 'max:500'],
            'countdown_date'  => ['nullable', 'string', 'max:30'],
            'music_url'       => ['nullable', 'string', 'max:1000'],
            'music_title'     => ['nullable', 'string', 'max:100'],
            'music_autoplay'  => ['nullable', 'boolean'],
            'rsvp_enabled'    => ['nullable', 'boolean'],
            'rsvp_limit'      => ['nullable', 'integer', 'min:1'],
            'bank_accounts'   => ['nullable', 'array'],
            'gift_address'    => ['nullable', 'string'],
            'wishes_enabled'  => ['nullable', 'boolean'],
            'seo_title'       => ['nullable', 'string', 'max:100'],
            'seo_description' => ['nullable', 'string'],
            'status'          => ['nullable', 'in:draft,published'],
        ]);

        $invitation->update($validated);
        $invitation->load('template');
        return response()->json(['message' => 'Tersimpan.', 'invitation' => new InvitationResource($invitation)]);
    }

    /** Upload foto (cover, groom, bride, hero_bg, qris) */
    public function uploadPhoto(Request $request, string $slug): JsonResponse
    {
        $invitation = Invitation::where('slug', $slug)
            ->where('user_id', $request->user()->id)->firstOrFail();

        $request->validate([
            'photo' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'type'  => ['required', 'in:cover,groom_photo,bride_photo,hero_bg_photo,qris_photo,seo_thumbnail'],
        ]);

        $field = $request->input('type');
        if ($invitation->{$field}) Storage::disk('public')->delete($invitation->{$field});
        $path = $request->file('photo')->store('photos/' . $slug, 'public');
        $invitation->update([$field => $path]);

        return response()->json(['url' => asset('storage/' . $path), 'field' => $field]);
    }

    /** Upload gallery (multiple) */
    public function uploadGallery(Request $request, string $slug): JsonResponse
    {
        $invitation = Invitation::where('slug', $slug)
            ->where('user_id', $request->user()->id)->firstOrFail();

        $request->validate([
            'photos'   => ['required', 'array', 'max:20'],
            'photos.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $existing = $invitation->gallery_photos ?? [];
        foreach ($request->file('photos') as $file) {
            $path = $file->store('gallery/' . $slug, 'public');
            $existing[] = asset('storage/' . $path);
        }

        $invitation->update(['gallery_photos' => $existing]);
        return response()->json(['gallery_photos' => $existing]);
    }

    /** Hapus satu foto gallery */
    public function deleteGalleryPhoto(Request $request, string $slug): JsonResponse
    {
        $invitation = Invitation::where('slug', $slug)
            ->where('user_id', $request->user()->id)->firstOrFail();

        $request->validate(['url' => ['required', 'string']]);
        $url     = $request->input('url');
        $current = $invitation->gallery_photos ?? [];
        $updated = array_values(array_filter($current, fn($u) => $u !== $url));
        $invitation->update(['gallery_photos' => $updated]);

        return response()->json(['gallery_photos' => $updated]);
    }

    public function destroy(Request $request, string $slug): JsonResponse
    {
        $invitation = Invitation::where('slug', $slug)
            ->where('user_id', $request->user()->id)->firstOrFail();
        Storage::disk('public')->deleteDirectory('photos/' . $slug);
        Storage::disk('public')->deleteDirectory('gallery/' . $slug);
        $invitation->delete();
        return response()->json(['message' => 'Dihapus.']);
    }
}
