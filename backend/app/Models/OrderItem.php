<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'product_variant_id',
        'quantity',
        'total_price'
    ];

    public function variant()
    {
        return $this->belongsTo(ProductVariant::class);
    }
}
