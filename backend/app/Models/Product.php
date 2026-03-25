<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'stock_count',
        'category',
        'image_url',
        'is_preorder',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'is_preorder' => 'boolean',
        ];
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
