<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
            DB::table('users')->insert([
                [
                    'name' => 'Virgilio',
                    'email' => 'virgiliopolini97@gmail.com',
                    'password' => Hash::make('virgilio97@!'),
                    'discipline_points' => 0,
                    'status_id' => 1, // coglioncello
                    'profile_picture' => 'images/virgipp.jpeg',
                    'int_tasks' => true,
                    'int_weight' => true,
                    'int_smoke' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Riccardo',
                    'email' => 'riccardogiordano97@gmail.com',
                    'password' => Hash::make('riccardo97@!'),
                    'discipline_points' => 0,
                    'status_id' => 1, // coglioncello
                    'profile_picture' => 'images/richpp.jpeg',
                    'int_tasks' => true,
                    'int_weight' => true,
                    'int_smoke' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Luca',
                    'email' => 'lucadeangelis98@gmail.com',
                    'password' => Hash::make('luca98@!'),
                    'discipline_points' => 0,
                    'status_id' => 1, // coglioncello
                    'profile_picture' => 'images/lucapp.jpeg',
                    'int_tasks' => true,
                    'int_weight' => false,
                    'int_smoke' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Lucy',
                    'email' => 'lucia.dngls@gmail.com',
                    'password' => Hash::make('lucy72@!'),
                    'discipline_points' => 0,
                    'status_id' => 1, // coglioncello
                    'profile_picture' => 'images/lucypp.jpeg',
                    'int_tasks' => true,
                    'int_weight' => true,
                    'int_smoke' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
    }
}