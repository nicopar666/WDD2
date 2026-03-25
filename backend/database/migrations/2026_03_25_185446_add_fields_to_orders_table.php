<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('payment_gateway')->default('Cash on Delivery')->after('payment_status');
            $table->text('shipping_address')->nullable()->after('payment_gateway');
            $table->decimal('tax_amount', 10, 2)->default(0)->after('total_price');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['payment_gateway', 'shipping_address', 'tax_amount']);
        });
    }
};
