<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Task;
use App\Models\Cigarette;
use App\Models\Weight;
use Illuminate\Support\Facades\Hash;

class CreateNewUser extends Command
{
    protected $signature = 'user:create 
                            {name} 
                            {email} 
                            {password} 
                            {--tasks=0} 
                            {--smoke=0} 
                            {--weight=0}
                            {--picture=}';

    protected $description = 'Crea un nuovo utente con record associati per tasks, cigarettes e weights';

    public function handle()
    {
        $name = $this->argument('name');
        $email = $this->argument('email');
        $password = $this->argument('password');
        $picture = $this->option('picture') ?? null;

        $int_tasks = $this->option('tasks') == '1';
        $int_smoke = $this->option('smoke') == '1';
        $int_weight = $this->option('weight') == '1';


        if (!($int_tasks || $int_smoke || $int_weight)) {
            $this->error('Devi abilitare almeno uno degli obiettivi: tasks, smoke o weight');
            return 1;
        }

        if (User::where('email', $email)->exists()) {
            $this->error("Esiste già un utente con questa email.");
            return 1;
        }

        // Creazione utente
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'status_id' => 1,
            'profile_picture' => $picture,
            'int_tasks' => $int_tasks,
            'int_smoke' => $int_smoke,
            'int_weight' => $int_weight,
        ]);

        $this->info("Utente creato con ID: {$user->id}");

        // Creazione record tasks
        if ($int_tasks) {
            Task::create([
                'user_id' => $user->id,
                'points_earned' => 0,
            ]);
            $this->info('Record tasks creato');
        }

        // Creazione/aggiornamento record cigarettes
        if ($int_smoke) {
            Cigarette::updateOrCreate(
                ['user_id' => $user->id],
                ['count' => 0, 'limit' => 10, 'consecutive_days' => 0, 'consecutive_weeks' => 0]
            );
            $this->info('Record cigarettes creato/aggiornato');
        }

        // Creazione/aggiornamento record weights
        if ($int_weight) {
            Weight::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'starting_weight' => 0,
                    'current_weight' => 0,
                    'ideal_weight' => 0,
                    'points_earned' => 0,
                    'date' => now()->toDateString(),
                ]
            );
            $this->info('Record weights creato/aggiornato');
        }

        $this->info('Utente e dati correlati creati con successo.');
        return 0;
    }
}