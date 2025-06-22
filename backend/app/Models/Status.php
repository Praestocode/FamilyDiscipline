<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = ['name', 'required_points', 'icon_path'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}