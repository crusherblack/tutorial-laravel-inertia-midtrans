<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Baju T-Shirt',
                'description' => 'Ini adalah Baju',
                'image' => 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80',
                'price' => 50000,
            ],
            [
                'name' => 'Sepatu',
                'description' => 'Sepatu Hitam',
                'image' => 'https://images.unsplash.com/photo-1496202703211-aa28e9500c30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                'price' => 75000,
            ],
            [
                'name' => 'Laptop Asus',
                'description' => 'Asus ROG',
                'image' => 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
                'price' => 20000000,
            ],
            [
                'name' => 'PS5',
                'description' => 'Sony Product',
                'image' => 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                'price' => 8500000,
            ],
           
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
