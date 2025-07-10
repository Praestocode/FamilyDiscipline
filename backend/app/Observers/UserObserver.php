<?php

namespace App\Observers;

use App\Models\User;
use Illuminate\Support\Facades\Cache;

class UserObserver
{
    public function saving(User $user)
    {
        // Recupera gli status dalla cache
        $statuses = Cache::get('statuses', []);

        // Trova lo status con il required_points più alto <= discipline_points
        $status_id = 1; // Default: Coglioncello
        foreach ($statuses as $status) {
            if ($user->discipline_points >= $status->required_points) {
                $status_id = $status->id;
                break;
            }
        }

        // Aggiorna status_id
        $user->status_id = $status_id;
    }
}