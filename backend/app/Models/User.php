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
        'total_points_earned_by_smoke_so_far',
        'total_points_earned_by_weight_so_far',
        'total_points_earned_by_tasks_so_far',
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