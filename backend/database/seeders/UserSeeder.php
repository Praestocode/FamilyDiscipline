<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    public function run()
    {
            DB::table('users')->insert([
                [
                    'name' => 'Virgilio',
                    'email' => 'virgiliopolini97@gmail.com',
                    'password' => Hash::make('password123'),
                    'discipline_points' => 0,
                    'status_id' => 1, // coglioncello
                    'profile_picture' => 'images/virgipp.webp',
                    'int_tasks' => true,
                    'int_weight' => true,
                    'int_smoke' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Riccardo',
                    'email' => 'riccardogiordano97@gmail.com',
                    'password' => Hash::make('password123'),
                    'discipline_points' => 0,
                    'status_id' => 1, // coglioncello
                    'profile_picture' => 'images/richpp.webp',
                    'int_tasks' => true,
                    'int_weight' => true,
                    'int_smoke' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Luca',
                    'email' => 'lucadeangelis98@gmail.com',
                    'password' => Hash::make('password123'),
                    'discipline_points' => 0,
                    'status_id' => 1, // coglioncello
                    'profile_picture' => 'images/lucapp.webp',
                    'int_tasks' => true,
                    'int_weight' => false,
                    'int_smoke' => true,
                    'created_at' => now(),
                    'updated_at' => now(), //'updated_at' => Carbon::today()->subDays(4), // Inattivo (4 giorni fa)
                ],
                [
                    'name' => 'Lucy',
                    'email' => 'lucia.dngls@gmail.com',
                    'password' => Hash::make('password123'),
                    'discipline_points' => 0,
                    'status_id' => 1, // coglioncello
                    'profile_picture' => 'images/lucypp.webp',
                    'int_tasks' => true,
                    'int_weight' => true,
                    'int_smoke' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Anna',
                    'email' => 'annapalmisio04@gmail.com',
                    'password' => Hash::make('password123'),
                    'discipline_points' => 0,
                    'status_id' => 1, // coglioncello
                    'profile_picture' => 'images/anna.webp',
                    'int_tasks' => true,
                    'int_weight' => false,
                    'int_smoke' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Daniele',
                    'email' => 'daniele96@gmail.com',
                    'password' => Hash::make('password123'),
                    'discipline_points' => 0,
                    'status_id' => 1, // coglioncello
                    'profile_picture' => 'images/daniele.webp',
                    'int_tasks' => true,
                    'int_weight' => false,
                    'int_smoke' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                // [
                //     'name' => 'Emil',
                //     'email' => 'emil02@gmail.com',
                //     'password' => Hash::make('password123'),
                //     'discipline_points' => 0,
                //     'status_id' => 1, // coglioncello
                //     'profile_picture' => 'images/emil.webp',
                //     'int_tasks' => true,
                //     'int_weight' => false,
                //     'int_smoke' => true,
                //     'created_at' => now(),
                //     'updated_at' => now(),
                // ],
            ]);
    }
}
