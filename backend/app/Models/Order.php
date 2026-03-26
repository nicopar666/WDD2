<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'customer_name',
        'email',
        'phone',
        'product_id',
        'quantity',
        'total_price',
        'tax_amount',
        'delivery_type',
        'payment_gateway',
        'shipping_address',
        'payment_status',
    ];

    protected function casts(): array
    {
        return [
            'total_price' => 'decimal:2',
            'tax_amount' => 'decimal:2',
            'quantity' => 'integer',
            'payment_status' => 'boolean',
        ];
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
