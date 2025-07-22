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
        Commands\CreateNewUser::class,
    ];

    protected function schedule(Schedule $schedule)
    {
        \Log::info('Schedule command check at '.now().' timezone: '.config('app.timezone'));
        $schedule->command('smoke:process-daily')->cron('* * * * *');
        $schedule->command('tasks:process-daily')->cron('* * * * *');
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
