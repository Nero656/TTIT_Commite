<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'login',
        'telephone_number',
        'email',
        'password',
        'avatar',
        'api_token',
        'role_id',
    ];

    public static function avatar($file, $wight, $height)
    {
        $fileName = uniqid();

        $image = ImageManagerStatic::make($file)
            ->resize($wight, $height)
            ->save(storage_path('app/public/images'.$fileName.'.webp'),100, 'webp');

        $fileDir = 'public/';

        cloudinary()->upload($file->getRealPath())->getSecurePath();

        return Storage::url();
    }

    public function logout(){
        $this->api_token = null;
        $this->save();
    }


    static function studentList(){
        return self::where(['role_id' => 3])->get();
    }

    static function professorList(){
        return self::where(['role_id' => 2])->where('api_token', '<>', null)->paginate(10);
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'email',
    ];
}
