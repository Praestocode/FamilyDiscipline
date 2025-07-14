<?php

namespace App\Console\Commands;

use App\Models\Cigarette;
use App\Models\User;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ProcessDailySmoke extends Command
{
    protected $signature = 'smoke:process-daily';
    protected $description = 'Process daily cigarette limits and assign points at midnight';

    public function handle()
    {
        Log::info('[Cron] Reset tasks eseguito');
        $this->info('Daily tasks points and completion status reset completed.');
        
        $users = User::where('int_smoke', true)->get();

        foreach ($users as $user) {
            $cigarette = Cigarette::where('user_id', $user->id)->first();

            if ($cigarette) {
                $count = $cigarette->count;
                $limit = $cigarette->limit;

                // Verifica se l'utente è stato attivo negli ultimi 3 giorni
                $isActive = Carbon::parse($user->updated_at)->greaterThanOrEqualTo(Carbon::today()->subDays(3));

                if ($count <= $limit && $isActive) {
                    // Limite rispettato e utente attivo: assegna punti e aggiorna contatori
                    $user->discipline_points += 50;
                    $user->total_points_earned_by_smoke_so_far += 50;
                    $user->save(); // Attiva l'Observer per aggiornare lo status
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
                    // Limite superato o utente non attivo: azzera contatori
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// {
//     protected $signature = 'smoke:process-daily';
//     protected $description = 'Process daily cigarette limits and assign points at midnight';

//     public function handle()
//     {
//         $users = User::where('int_smoke', true)->get();

//         foreach ($users as $user) {
//             $cigarette = Cigarette::where('user_id', $user->id)->first();

//             if ($cigarette) {
//                 $count = $cigarette->count;
//                 $limit = $cigarette->limit;

//                 if ($count <= $limit) {
//                     // Limite rispettato: assegna punti e incrementa consecutive_days
//                     $user->increment('discipline_points', 50);
//                     $user->increment('total_points_earned_by_smoke_so_far', 50);
//                     $cigarette->consecutive_days++;

//                     // Se consecutive_days raggiunge 7, incrementa consecutive_weeks
//                     if ($cigarette->consecutive_days >= 7) {
//                         $cigarette->consecutive_weeks++;
//                         $cigarette->consecutive_days = 0;
//                     }

//                     // Se consecutive_weeks raggiunge 3, riduci limit
//                     if ($cigarette->consecutive_weeks >= 3) {
//                         if ($cigarette->limit > 0) {
//                             $cigarette->limit--;
//                         }
//                         $cigarette->consecutive_weeks = 0;
//                         $cigarette->consecutive_days = 0;
//                     }
//                 } else {
//                     // Limite superato: azzera tutto
//                     $cigarette->consecutive_days = 0;
//                     $cigarette->consecutive_weeks = 0;
//                 }

//                 // Resetta count
//                 $cigarette->count = 0;
//                 $cigarette->save();
//             }
//         }

//         $this->info('Daily smoke processing completed.');
//     }
// }
