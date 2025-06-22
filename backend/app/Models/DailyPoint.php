<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyPoint extends Model
{
    protected $fillable = ['user_id', 'date', 'points'];
    protected $casts = ['date' => 'date'];
}