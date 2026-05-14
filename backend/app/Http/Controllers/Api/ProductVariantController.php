<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductVariantController extends Controller
{
    public function index()
    {
        return response()->json(ProductVariant::with('product.category')->get());
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'sku' => 'nullable|string|unique:product_variants,sku',
            'variant_name' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        $variant = ProductVariant::create([
            'product_id' => $validated['product_id'],
            'sku' => $request->sku ?? 'SKU-' . time(),
            'variant_name' => $validated['variant_name'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
        ]);

        return response()->json(
            $variant->load('product.category'),
            201
        );
    }

    public function show(string $id)
    {
        return ProductVariant::with('product.category')->findOrFail($id);
    }

    public function edit(ProductVariant $productVariant)
    {
        //
    }

    public function update(Request $request, ProductVariant $productVariant)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'variant_name' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        $productVariant->update($validated);

        return response()->json($productVariant->load('product.category'));
    }

    public function destroy(ProductVariant $productVariant)
    {
        $productVariant->delete();
        return response()->json(['message' => 'Variant deleted']);
    }
}
