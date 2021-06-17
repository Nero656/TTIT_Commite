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

        $file = $request -> file('file');

        $fileName = uniqid() . '.' . $file -> extension();

        $fileDir = 'public/file/';

        $file->storeAs($fileDir, $fileName);

        $order = order::create([
            'file'=>$request->$fileDir.$fileName,
            'status'=>$request->status,
            'user_id' => $request->user_id,
            'request_id' => $request->request_id
        ]);


        return response([
            'you create' => $order
        ]);
    }

    public function download()
    {
        $file = public_path()."/file.docx";

        return response()->download($file, 'file.docx');
    }


    public function downloadReqFile(Order $order)
    {
        $file = storage_path('app/public/file/').$order->file;
//        dd($file);
        return response()->download($file, 'file.docx');
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
