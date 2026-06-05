<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\ProductVariant; 
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::with('items.variant', 'customer')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:users,id',
            'items' => 'required|array',
            'items.*.product_variant_id' => 'required|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $order = Order::create([
            'customer_id' => $request->user()->id,
            'total_price' => collect($request->items)->sum(
                fn ($item) => ProductVariant::findOrFail($item['product_variant_id'])->price * $item['quantity']),
            'status' => 'Pending',
        ]);

        foreach ($request->items as $item) {
            $variant = ProductVariant::findOrFail($item['product_variant_id']);
            $order->items()->create([
                'product_variant_id' => $variant->id,
                'quantity' => $item['quantity'],
                'total_price' => $variant->price * $item['quantity'],
            ]);
            $variant->decrement('stock', $item['quantity']);
        }

        return response()->json($order->load('items.variant', 'customer'));
    }

    public function show($id)
    {
        return response()->json(Order::with('items.variant')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Pending,Processing,Shipped,Delivered,Canceled'
        ]);

        return response()->json(tap(Order::findOrFail($id))->update([
            'status' => $request->status
        ])->load('items.variant'));
    }

    public function destroy($id)
    {
        return response()->json(Order::destroy($id));
    }
}