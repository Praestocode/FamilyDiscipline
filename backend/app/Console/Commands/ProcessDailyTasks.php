<?php

namespace App\Console\Commands;

use App\Models\Task;
use Illuminate\Console\Command;

class ProcessDailyTasks extends Command
{
    protected $signature = 'tasks:process-daily';
    protected $description = 'Reset daily task points and completion status at midnight';

    public function handle()
    {
        $tasks = Task::all();

        foreach ($tasks as $task) {
            $task->points_earned = 0;
            // Resetta i campi completed per weekday
            foreach (range(5, 22) as $hour) {
                for ($taskNum = 1; $taskNum <= 3; $taskNum++) {
                    $field = "weekday_{$hour}_task_{$taskNum}_completed";
                    $task->$field = false;
                    $field = "weekend_{$hour}_task_{$taskNum}_completed";
                    $task->$field = false;
                }
            }
            $task->save();
        }

        $this->info('Daily tasks points and completion status reset completed.');
    }
}