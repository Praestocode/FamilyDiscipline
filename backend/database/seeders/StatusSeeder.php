<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    public function run()
    {
        $statuses = [
            [
                'name' => 'Coglioncello',
                'required_points' => 0,
                'icon_path' => 'images/icons/coglioncello.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Buffone',
                'required_points' => 1000,
                'icon_path' => 'images/icons/buffone.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Principiante',
                'required_points' => 2000,
                'icon_path' => 'images/icons/principiante.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dedicato',
                'required_points' => 3500,
                'icon_path' => 'images/icons/dedicato.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Costante',
                'required_points' => 4500,
                'icon_path' => 'images/icons/costante.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Campione',
                'required_points' => 6000,
                'icon_path' => 'images/icons/campione.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Maestro',
                'required_points' => 8000,
                'icon_path' => 'images/icons/maestro.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Re',
                'required_points' => 10000,
                'icon_path' => 'images/icons/re.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Leggenda',
                'required_points' => 20000,
                'icon_path' => 'images/icons/leggenda.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('statuses')->insert($statuses);
    }
}