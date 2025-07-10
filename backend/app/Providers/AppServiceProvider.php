<?php

use Illuminate\Support\Facades\Schema;

public function boot(): void
{
    // Registra l'UserObserver
    User::observe(UserObserver::class);

    // Evita errori durante il deploy quando il DB non è ancora accessibile
    if (app()->runningInConsole()) {
        return;
    }

    if (Schema::hasTable('statuses')) {
        Cache::rememberForever('statuses', function () {
            return \DB::table('statuses')
                ->select('id', 'required_points')
                ->orderBy('required_points', 'desc')
                ->get()
                ->toArray();
        });
    }
}
