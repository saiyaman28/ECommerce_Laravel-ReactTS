<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant; 
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::with('items.variant', 'customer')->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.product_variant_id' => 'required|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1'
        ]);

        $total = 0;

        foreach ($validated['items'] as $item) {
            $variant = ProductVariant::findOrFail($item['product_variant_id']);
            $total += $variant->price * $item['quantity'];
        }

        $order = Order::create([
            'customer_id' => $request->user()->id, // ✅ THIS IS THE KEY CHANGE
            'total_price' => $total,
            'status' => 'Pending',
        ]);

        foreach ($validated['items'] as $item) {
            $variant = ProductVariant::findOrFail($item['product_variant_id']);

            $order->items()->create([
                'product_variant_id' => $variant->id,
                'quantity' => $item['quantity'],
                'total_price' => $variant->price * $item['quantity']
            ]);

            $variant->decrement('stock', $item['quantity']);
        }

        return response()->json($order->load('items.variant', 'customer'), 201);
    }

    public function show(Order $order)
    {
        return response()->json(
            $order->load('items.variant')
        );
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:Pending,Processing,Shipped,Delivered,Canceled'
        ]);

        $order->update($validated);

        return response()->json($order->load('items.variant'));
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return response()->json([
            'message' => 'Order deleted'
        ]);
    }
}