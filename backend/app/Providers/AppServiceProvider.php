<?php

namespace App\Providers;

use App\Models\User;
use App\Observers\UserObserver;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Registra l'UserObserver
        User::observe(UserObserver::class);

        // Carica gli status in cache per migliorare le prestazioni
        Cache::rememberForever('statuses', function () {
            return \DB::table('statuses')
                ->select('id', 'required_points')
                ->orderBy('required_points', 'desc')
                ->get()
                ->toArray();
        });
    }
}