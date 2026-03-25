<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::all();
        return response()->json(['data' => $products]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock_count' => 'required|integer|min:0',
            'category' => 'nullable|string|max:255',
            'image_url' => 'nullable|string',
            'is_preorder' => 'boolean',
        ]);

        $product = Product::create($validated);
        return response()->json(['data' => $product], 201);
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'stock_count' => 'sometimes|integer|min:0',
            'category' => 'nullable|string|max:255',
            'image_url' => 'nullable|string',
            'is_preorder' => 'boolean',
        ]);

        $product->update($validated);
        return response()->json(['data' => $product]);
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();
        return response()->json(null, 204);
    }

    public function updateStock(Request $request, Product $product): JsonResponse
    {
        $validated = $request->validate([
            'stock_count' => 'required|integer|min:0',
        ]);

        $product->update(['stock_count' => $validated['stock_count']]);
        return response()->json(['data' => $product]);
    }
}
