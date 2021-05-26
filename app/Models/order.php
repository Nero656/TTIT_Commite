<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class order extends Model
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'file',
        'status',
        'user_id',
        'request_id'
    ];

    public function user(){
        return $this->hasMany(User::class, 'id','user_id');
    }

    public function request(){
        return $this->hasMany(request::class, 'id','request_id');
    }
}
