<?php

namespace App\Http\Requests;
use App\Http\Requests\ApiRequest;

class userRequest extends ApiRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "username" => "required",
            "login" => "required|unique:users",
            "email" => "required|unique:users",
            "avatar" => "required",
            "telephone_number" => "unique:users",
            "password" => "required",
            "role_id",
        ];
    }
}
