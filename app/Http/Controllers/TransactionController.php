<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Log;


class TransactionController extends Controller
{
    public function checkoutOrder(Request $request) {
        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY', false);
        \Midtrans\Config::$isProduction = false;
        \Midtrans\Config::$isSanitized = true;

        $order_id = rand();

        $params = [
            'transaction_details' => [
                'order_id' =>  $order_id,
                'gross_amount' => $request->total,
            ]
        ];

        Transaction::create([
            'transaction_id' =>  $order_id,
            'total' => $request->total,
            'status' => "TEMP"
        ]); 

        $snapToken = \Midtrans\Snap::getSnapToken($params);

        return response()->json($snapToken);

    }

    public function notification(Request $request){
        $transaction = $request->transaction_status;
        $order_id = $request->order_id;
        
        $transactionData = Transaction::where('transaction_id', $order_id)->first();

        if ($transaction == 'settlement') {
            $transactionData->status = 'SUCCESS';
        } else if ($transaction == 'pending') {
            $transactionData->status = 'PENDING';
        } else if ($transaction == 'deny') {
            $transactionData->status = 'DENY';
        } else if ($transaction == 'expire') {
            $transactionData->status = 'EXPIRE';
        } else if ($transaction == 'cancel') {
            $transactionData->status = 'CANCEL';
        }

        $transactionData->save();

        return response()->json([
            "message" => "succes",
        ]);
    }
}
