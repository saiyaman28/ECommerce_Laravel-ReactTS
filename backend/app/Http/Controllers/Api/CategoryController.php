<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_name' => 'required|string|max:255'
        ]);

        return response()->json(Category::create($request->only('category_name')));
    }

    public function show($id)
    {
        return response()->json(Category::where('id', $id)->first());
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'category_name' => 'required|string|max:255'
        ]);

        return response()->json(Category::where('id', $id)->update($request->only('category_name')));
    }

    public function destroy($id)
    {
        return response()->json(Category::destroy($id));
    }
}