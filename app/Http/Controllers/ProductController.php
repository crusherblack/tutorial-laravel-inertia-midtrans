<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller
{
    public function landingPage() {
        $products = Product::all();

        return Inertia::render('Welcome', [
            'products' => $products
        ]);
    }
}
