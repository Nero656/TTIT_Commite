<?php

namespace App\Http\Controllers;

use App\Models\category;
use App\Models\User;
use Illuminate\Http\Request;

class categoryController extends Controller
{
    public function index()
    {
        return category::all();
    }

    /**
     * @param Request $request
     */
    public function store(Request $request)
    {
        $category = category::create([
            'title' => $request->title,
            'img_url' => User::avatar($request->file('img_url'), 1920, 1080),
            'desc' => $request->desc,
        ]);

        return response([
            'You create category' => $category
        ])->setStatusCode(201);
    }

    public function update(category $category, Request $request){
        $update = [
            'img_url' => User::avatar($request->file('img_url'), 1920, 1080),
        ];
        $category->update(array_merge($request->all(), $update));

        return response([
            'You update category' => $category
        ])->setStatusCode(201);
    }

    public function delete(category $category){
        $category->delete();

        return response([
            'You delete category' => $category
        ])->setStatusCode(201);
    }
}
