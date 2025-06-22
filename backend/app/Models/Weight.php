<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Weight extends Model
{
    protected $fillable = ['user_id', 'starting_weight', 'current_weight', 'ideal_weight', 'points_earned', 'date'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}