<?php

namespace Database\Seeders;

use App\Models\Cigarette;
use App\Models\User;
use Illuminate\Database\Seeder;

class CigaretteSeeder extends Seeder
{
    public function run()
    {
        $users = User::where('int_smoke', true)->get();

        foreach ($users as $user) {
            Cigarette::updateOrCreate(
                ['user_id' => $user->id],
                ['count' => 0, 'limit' => 10, 'consecutive_days' => 0, 'consecutive_weeks' => 0]
            );
        }
    }
}