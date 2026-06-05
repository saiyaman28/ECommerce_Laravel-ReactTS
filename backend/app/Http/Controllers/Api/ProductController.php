<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::with('category')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        return response()->json(Product::create([
            'product_name' => $request->product_name,
            'category_id' => $request->category_id,
            'description' => $request->description,
            'image' => $request->hasFile('image')
                ? $request->file('image')->store('products', 'public')
                : null,
        ]));
    }

    public function show($id)
    {
        return response()->json(Product::with('category')->where('id', $id)->first());
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'product_name' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        return response()->json(Product::where('id', $id)->update([
            'product_name' => $request->product_name,
            'category_id' => $request->category_id,
            'description' => $request->description,
            'image' => $request->hasFile('image')
                ? $request->file('image')->store('products', 'public')
                : Product::where('id', $id)->value('image'),
        ]));
    }

    public function destroy($id)
    {
        return response()->json(Product::destroy($id));
    }
}