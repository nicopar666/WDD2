<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'productName' => $this->product_name,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'price' => (float) $this->price,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
