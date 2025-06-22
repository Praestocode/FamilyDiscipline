<?php

namespace App\Console\Commands;

use App\Models\Cigarette;
use App\Models\User;
use Illuminate\Console\Command;

class ProcessDailySmoke extends Command
{
    protected $signature = 'smoke:process-daily';
    protected $description = 'Process daily cigarette limits and assign points at midnight';

    public function handle()
    {
        $users = User::where('int_smoke', true)->get();

        foreach ($users as $user) {
            $cigarette = Cigarette::where('user_id', $user->id)->first();

            if ($cigarette) {
                $count = $cigarette->count;
                $limit = $cigarette->limit;

                if ($count <= $limit) {
                    // Limite rispettato: assegna punti e incrementa consecutive_days
                    $user->increment('discipline_points', 50);
                    $cigarette->consecutive_days++;

                    // Se consecutive_days raggiunge 7, incrementa consecutive_weeks
                    if ($cigarette->consecutive_days >= 7) {
                        $cigarette->consecutive_weeks++;
                        $cigarette->consecutive_days = 0;
                    }

                    // Se consecutive_weeks raggiunge 3, riduci limit
                    if ($cigarette->consecutive_weeks >= 3) {
                        if ($cigarette->limit > 0) {
                            $cigarette->limit--;
                        }
                        $cigarette->consecutive_weeks = 0;
                        $cigarette->consecutive_days = 0;
                    }
                } else {
                    // Limite superato: azzera tutto
                    $cigarette->consecutive_days = 0;
                    $cigarette->consecutive_weeks = 0;
                }

                // Resetta count
                $cigarette->count = 0;
                $cigarette->save();
            }
        }

        $this->info('Daily smoke processing completed.');
    }
}