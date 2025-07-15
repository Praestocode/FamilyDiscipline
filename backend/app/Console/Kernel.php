<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        Commands\ProcessDailySmoke::class,
        Commands\ProcessDailyTasks::class,
    ];

    protected function schedule(Schedule $schedule)
    {
        \Log::info('Schedule command check at '.now().' timezone: '.config('app.timezone'));
        $schedule->command('smoke:process-daily')->dailyAt('13:10');
        $schedule->command('tasks:process-daily')->dailyAt('13:10');
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
