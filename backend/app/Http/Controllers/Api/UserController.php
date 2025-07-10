<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
public function index()
{
    $users = User::with('status')->select([
        'id',
        'name',
        'discipline_points',
        'total_points_earned_by_smoke_so_far',
        'total_points_earned_by_weight_so_far',
        'total_points_earned_by_tasks_so_far',
        'int_smoke',
        'int_weight',
        'int_tasks',
        'status_id',
        'profile_picture'
    ])->get();
    $users->each(function ($user) {
        $user->status_name = $user->status->name; // Nome dello status (es. coglioncello)
        $user->status_icon = url($user->status->icon_path); // URL dell'icona
        $user->profile_picture = $user->profile_picture ? url($user->profile_picture) : null;
        unset($user->status); // Rimuove l'oggetto status
    });
    return response()->json($users);
}

public function show()
{
    $user = User::with('status')->find(Auth::id());
    $data = [
        'name' => $user->name,
        'status_id' => $user->status_id,
        'status' => $user->status->name,
        'status_icon' => url($user->status->icon_path),
        'discipline_points' => $user->discipline_points,
        'profile_picture' => $user->profile_picture ? url($user->profile_picture) : null,
        'int_tasks' => $user->int_tasks,
        'int_weight' => $user->int_weight,
        'int_smoke' => $user->int_smoke,
    ];
    return response()->json($data);
}




public function pointsHistory()
{
    $isWeekend = in_array(now()->dayOfWeek, [0, 6]); // 0 = Domenica, 6 = Sabato
    $taskType = $isWeekend ? 'weekend' : 'weekday';

    // Costruisci dinamicamente i campi delle task da selezionare
    $taskFields = [];
    foreach (range(5, 22) as $hour) {
        for ($taskNum = 1; $taskNum <= 3; $taskNum++) {
            $taskFields[] = "tasks.{$taskType}_{$hour}_task_{$taskNum}";
            $taskFields[] = "tasks.{$taskType}_{$hour}_task_{$taskNum}_completed";
        }
    }

    // Query ottimizzata con join condizionali
    $users = User::select(array_merge([
        'users.id',
        'users.name',
        'users.discipline_points',
        'users.total_points_earned_by_smoke_so_far',
        'users.total_points_earned_by_weight_so_far',
        'users.total_points_earned_by_tasks_so_far',
        'users.int_smoke',
        'users.int_weight',
        'users.int_tasks',
        'cigarettes.count as smoke_count',
        'cigarettes.limit as smoke_limit',
        'cigarettes.consecutive_days as smoke_consecutive_days',
        'cigarettes.consecutive_weeks as smoke_consecutive_weeks',
        'weights.current_weight',
        'weights.ideal_weight'
    ], $taskFields))
    ->leftJoin('cigarettes', function ($join) {
        $join->on('users.id', '=', 'cigarettes.user_id')
             ->where('users.int_smoke', true);
    })
    ->leftJoin('weights', function ($join) {
        $join->on('users.id', '=', 'weights.user_id')
             ->where('users.int_weight', true);
    })
    ->leftJoin('tasks', function ($join) {
        $join->on('users.id', '=', 'tasks.user_id')
             ->where('users.int_tasks', true);
    })
    ->get();

    // Calcolo delle task giornaliere
    $users = $users->map(function ($user) use ($taskType) {
        $result = [
            'id' => $user->id,
            'name' => $user->name,
            'discipline_points' => $user->discipline_points,
            'total_points_earned_by_smoke_so_far' => $user->total_points_earned_by_smoke_so_far,
            'total_points_earned_by_weight_so_far' => $user->total_points_earned_by_weight_so_far,
            'total_points_earned_by_tasks_so_far' => $user->total_points_earned_by_tasks_so_far,
            'int_smoke' => $user->int_smoke,
            'int_weight' => $user->int_weight,
            'int_tasks' => $user->int_tasks,
            'smoke_details' => $user->int_smoke && $user->smoke_count !== null ? [
                'count' => $user->smoke_count,
                'limit' => $user->smoke_limit,
                'consecutive_days' => $user->smoke_consecutive_days,
                'consecutive_weeks' => $user->smoke_consecutive_weeks
            ] : null,
            'weight_details' => $user->int_weight && $user->current_weight !== null ? [
                'current_weight' => $user->current_weight,
                'ideal_weight' => $user->ideal_weight
            ] : null,
            'tasks_details' => $user->int_tasks ? [
                'total_tasks_today' => 0,
                'completed_tasks_today' => 0
            ] : null
        ];

        // Calcolo task solo per utenti con int_tasks = true
        if ($user->int_tasks) {
            $totalTasks = 0;
            $completedTasks = 0;
            foreach (range(5, 22) as $hour) {
                for ($taskNum = 1; $taskNum <= 3; $taskNum++) {
                    $field = "{$taskType}_{$hour}_task_{$taskNum}";
                    $completedField = "{$field}_completed";
                    if ($user->$field) {
                        $totalTasks++;
                        if ($user->$completedField) {
                            $completedTasks++;
                        }
                    }
                }
            }
            $result['tasks_details'] = [
                'total_tasks_today' => $totalTasks,
                'completed_tasks_today' => $completedTasks
            ];
        }

        return $result;
    });

    return response()->json($users);
}
}