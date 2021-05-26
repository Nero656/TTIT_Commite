<?php

namespace App\Http\Controllers;

use App\Models\category;
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
        ]);

        return response([
            'You create category' => $category
        ])->setStatusCode(201);
    }

    public function update(category $category, Request $request){
        $category->update($request->all());

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
