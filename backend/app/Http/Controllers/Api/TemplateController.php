<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TemplateResource;
use App\Models\Template;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TemplateController extends Controller
{
    /**
     * GET /api/templates
     * Query params:
     *   - has_photo  : true | false   (opsional)
     *   - category   : elegant | immersive | spesial  (opsional)
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $request->validate([
            'has_photo' => ['nullable', 'in:true,false,1,0'],
            'category'  => ['nullable', 'in:elegant,immersive,spesial'],
        ]);

        $query = Template::query();

        // Filter has_photo
        if ($request->has('has_photo')) {
            $hasPhoto = filter_var($request->input('has_photo'), FILTER_VALIDATE_BOOLEAN);
            $query->where('has_photo', $hasPhoto);
        }

        // Filter category
        if ($request->filled('category')) {
            $query->where('category', strtolower($request->input('category')));
        }

        $templates = $query->orderBy('id')->get();

        return TemplateResource::collection($templates);
    }

    /**
     * GET /api/templates/{id}
     */
    public function show(int $id): TemplateResource|JsonResponse
    {
        $template = Template::find($id);

        if (! $template) {
            return response()->json(['message' => 'Template tidak ditemukan.'], 404);
        }

        return new TemplateResource($template);
    }

    /**
     * GET /api/templates/by-slug/{slug}
     * Ambil template berdasarkan slug untuk halaman preview
     */
    public function showBySlug(string $slug): TemplateResource|JsonResponse
    {
        $template = Template::where('slug', $slug)->first();

        if (! $template) {
            return response()->json(['message' => 'Tema tidak ditemukan.'], 404);
        }

        return new TemplateResource($template);
    }
}
