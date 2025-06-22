<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        Commands\ProcessDailySmoke::class,
        Commands\ProcessDailyTasks::class,
    ];

    protected function schedule(Schedule $schedule)
    {
        $schedule->command('smoke:process-daily')->dailyAt('00:00');
        $schedule->command('tasks:process-daily')->dailyAt('00:00');
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}