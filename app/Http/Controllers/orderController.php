<?php

namespace App\Http\Controllers;

use App\Models\order;
use Illuminate\Http\Request;


class orderController extends Controller
{
    public function index(order $order){
        return response([
            $order->with('request.category')->paginate(6)
        ])->setStatusCode(200);
    }

    public function UserOrderList(order $order, Request $request)
    {
        return response(
            $order->with('request.category')->where(['user_id'=>$request->user_id])->get()
        )->setStatusCode(200);
    }

    public function store(Request $request){

        $order = order::create([
            'file'=>$request->file,
            'status'=>$request->status,
            'user_id' => $request->user_id,
            'request_id' => $request->request_id
        ]);


        return response([
            'you create' => $order
        ]);
    }
    public function show(order $order){
        return $order->with( 'request.category')->findOrFail($order->id);
    }

    public function update(order $order, Request $request){
        $order->update($request->all());

        return response([
            "you update" => $order
        ]);
    }
    public function delete(order $order){
        $order->delete();

        return response(['you delete' => $order]);
    }
}
