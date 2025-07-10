<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Cache;
use App\Models\User;
use App\Observers\UserObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

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
}
