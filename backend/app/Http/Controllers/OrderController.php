<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(): JsonResponse
    {
        $orders = Order::with('product')->orderBy('created_at', 'desc')->get();
        return response()->json(['data' => $orders]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer|min:1',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:20',
            'delivery_type' => 'nullable|in:delivery,pickup',
            'payment_gateway' => 'nullable|string|max:50',
            'shipping_address' => 'nullable|string|max:500',
        ]);

        $product = Product::findOrFail($validated['product_id']);
        $quantity = $validated['quantity'] ?? 1;

        if ($product->stock_count < $quantity && !$product->is_preorder) {
            return response()->json(['message' => 'Insufficient stock'], 400);
        }

        $subtotal = $product->price * $quantity;
        $taxAmount = $subtotal * 0.12;
        $totalPrice = $subtotal + $taxAmount;

        $order = Order::create([
            'customer_name' => $validated['customer_name'],
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'product_id' => $product->id,
            'quantity' => $quantity,
            'total_price' => $totalPrice,
            'tax_amount' => $taxAmount,
            'delivery_type' => $validated['delivery_type'] ?? 'delivery',
            'payment_gateway' => $validated['payment_gateway'] ?? 'Cash on Delivery',
            'shipping_address' => $validated['shipping_address'] ?? null,
            'payment_status' => true,
        ]);

        if (!$product->is_preorder) {
            $product->decrement('stock_count', $quantity);
        }

        return response()->json(['data' => $order], 201);
    }

    public function show(Order $order): JsonResponse
    {
        return response()->json(['data' => $order->load('product')]);
    }
}
