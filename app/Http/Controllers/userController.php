<?php

namespace App\Http\Controllers;

use App\Http\Requests\userRequest;
use App\Models\User;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class userController extends Controller
{
    public function store(userRequest $request)
    {

        if ($request->file('avatar') !== null) {
            $user = User::create([
                "username" => $request->username,
                "login" => $request->login,
                "email" => $request->email,
                "avatar" => User::avatar($request->file('avatar'), 250, 250),
//todo "avatar" => Cloudinary::upload($request->file('avatar')->getRealPath())->getSecurePath(),
                "telephone_number" => $request->telephone_number,
                "password" => hash::make($request->password),
                "role_id" => $request->role_id = 3,
            ]);
        } else {
            $user = User::create([
                "username" => $request->username,
                "login" => $request->login,
                "email" => $request->email,
                "avatar" => $request->avatar,
                "telephone_number" => $request->telephone_number,
                "password" => hash::make($request->password),
                "role_id" => $request->role_id = 3,
            ]);
        }

        return response(['user' => $user,])->setStatusCode(200);
    }

    public function showUser(User $user)
    {
        return $user;
    }

    public function show(){
        return Auth::user();
    }

    public function studList()
    {
        return User::studentList();
    }

    public function profList()
    {
        return User::professorList();
    }


    public function auth()
    {
        if (!auth()->attempt(request(['login', 'password']))) {
            return response()->json(['message' => 'authorization error'])->setStatusCode(403);
        }

        Auth::user()->api_token = Hash::make(Str::random(40));
        Auth::user()->save();

        return response(['message' => Auth::user()->api_token])->setStatusCode(201);
    }


    public function logout()
    {
        Auth::user()->logout();

        return response()->json(['response' => "you have successfully logged out"]);
    }
}
