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

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'variant_name' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $request['sku'] = $request->sku ?? 'SKU-' . time();

        return response()->json(ProductVariant::create([
            'product_id' => $request->product_id,
            'sku' => $request->sku,
            'variant_name' => $request->variant_name,
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $request->hasFile('image')
                ? $request->file('image')->store('products', 'public')
                : null,
        ]));
    }

    public function show($id)
    {
        return response()->json(ProductVariant::with('product.category')->where('id', $id)->first());
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'variant_name' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        return response()->json(ProductVariant::where('id', $id)->update([
            'product_id' => $request->product_id, 
            'variant_name' => $request->variant_name, 
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $request->hasFile('image')
                ? $request->file('image')->store('products', 'public')
                : Product::where('id', $id)->value('image'),
        ]));
    }

    public function destroy($id)
    {
        return response()->json(ProductVariant::destroy($id));
    }
}