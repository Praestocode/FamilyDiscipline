<?php

namespace Database\Seeders;

use App\Models\Weight;
use App\Models\User;
use Illuminate\Database\Seeder;

class WeightSeeder extends Seeder
{
    public function run()
    {
        $users = User::where('int_weight', true)->get();

        foreach ($users as $user) {
            Weight::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'starting_weight' => 0,
                    'current_weight' => 0,
                    'ideal_weight' => 0,
                    'points_earned' => 0,
                    'date' => now()->toDateString(),
                ]
            );
        }
    }
}