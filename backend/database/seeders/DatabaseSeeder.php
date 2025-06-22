<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            StatusSeeder::class,
            UserSeeder::class,
            CigaretteSeeder::class,
            WeightSeeder::class,
            TasksSeeder::class,
        ]);
    }
}