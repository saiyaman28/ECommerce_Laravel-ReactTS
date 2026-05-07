<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $fillable = [
        'sku', 
        'product_id',
        'variant_name', 
        'price', 
        'stock', 
        'last_update', 
        'image'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
