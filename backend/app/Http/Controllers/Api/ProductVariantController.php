<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            ProductVariant::with([
                'product.category'
            ])->get()
        );
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'sku' => 'required|string|unique:product_variants,sku',
            'variant_name' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        $variant = ProductVariant::create([
            'product_id' => $validated['product_id'],
            'sku' => $validated['sku'],
            'variant_name' => $validated['variant_name'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
        ]);

        return response()->json(
            $variant->load('product.category'),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductVariant $productVariant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductVariant $productVariant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductVariant $productVariant)
    {
        $validated = $request->validate([
            'variant_name' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        $productVariant->update($validated);

        return response()->json($productVariant->load('product.category'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductVariant $productVariant)
    {
        $productVariant->delete();
        return response()->json(['message' => 'Variant deleted']);
    }
}
