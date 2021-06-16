<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic;

class request extends Model
{
    use HasFactory,
        Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'certificate',
        'Passport',
        'agreement',
        'user_id',
        'category_id',
    ];

    public function category(){
        return $this->hasMany(category::class, 'id', 'category_id');
    }
}
