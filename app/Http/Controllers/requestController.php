<?php

namespace App\Http\Controllers;

use App\Http\Requests\requestRequest;
use Illuminate\Http\Request;

class requestController extends Controller
{
    public function index(\App\Models\request $req)
    {
        return response([
            $req->with('category')->paginate(6)
        ])->setStatusCode(200);
    }

    public function UserReqList(\App\Models\request $req, Request $request)
    {
        return response([
            $req->where(['user_id' => $request->user_id])->with('category')->paginate(6)
        ])->setStatusCode(200);
    }

    public function store(requestRequest $request)
    {
        $req = \App\Models\request::create([
            'title' => $request->title,
            'category_id' => $request->category_id,
            'user_id' => $request->user_id,
            'certificate' => $request->certificate,
            'Passport' => $request->Passport,
            'agreement' => $request->agreement
        ]);

        return response([
            "You create request" => $req
        ])->setStatusCode(201);
    }

    public function show(\App\Models\request $request){
        return \App\Models\request::with('category')->findOrFail($request->id);
    }

    public function update(\App\Models\request $request, Request $req){
        $request->update($req->all());

        return response([
            'You update request' => $request
        ])->setStatusCode(201);
    }


    public function delete(\App\Models\request $request)
    {
        $request->delete();

        return response([
            'You delete request' => $request
        ]);
    }
}
