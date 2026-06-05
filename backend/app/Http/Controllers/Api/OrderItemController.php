<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OrderItem;

class OrderItemController extends Controller
{
    public function index()
    {
        return response()->json(OrderItem::all());
    }

    public function store()
    {
        // 
    }

    public function show($id)
    {
        return response()->json(OrderItem::where('id', $id)->first());
    }

    
    public function update()
    {
        // 
    }

    
    public function destroy()
    {
        // 
    }
}