<?php

namespace App\Http\Requests;

use App\Http\Requests\ApiRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;


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
            "username" => "",
            "login" => "",
            "email" => "",
            "avatar" => "",
            "telephone_number" => "",
            "password" => "",
            "role_id",
        ];
    }
}
