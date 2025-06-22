<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'discipline_points',
        'status_id',
        'profile_picture',
        'int_tasks',
        'int_weight',
        'int_smoke',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}