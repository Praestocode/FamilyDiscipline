<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cigarette extends Model
{
    protected $primaryKey = 'user_id';
    public $incrementing = false;
    protected $fillable = ['user_id', 'count', 'limit', 'consecutive_days', 'consecutive_weeks'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}