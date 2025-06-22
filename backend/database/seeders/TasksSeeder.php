<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\User;

class TasksSeeder extends Seeder
{
    public function run()
    {
        $users = User::where('int_tasks', true)->get();

        foreach ($users as $user) {
            Task::create([
                'user_id' => $user->id,
                'points_earned' => 0,
            ]);
        }
    }
}