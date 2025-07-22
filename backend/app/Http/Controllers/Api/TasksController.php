<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class TasksController extends Controller
{
    public function getStatus()
    {
        /** @var User $user */
        $user = Auth::user();

        $task = Task::where('user_id', $user->id)->first();
        if (!$task) {
            return response()->json(['tasks' => [], 'points_earned' => 0, 'discipline_points' => $user->discipline_points ?? 0]);
        }

        $tasks = [];
        $hours = range(5, 22);

        // Tasks feriali
        foreach ($hours as $hour) {
            for ($taskNum = 1; $taskNum <= 3; $taskNum++) {
                $description = $task->{"weekday_{$hour}_task_{$taskNum}"};
                if ($description) {
                    $tasks[] = [
                        'id' => "weekday_{$hour}_task_{$taskNum}",
                        'description' => $description,
                        'time' => sprintf("%02d:00:00", $hour),
                        'type' => 'weekday',
                        'completed' => $task->{"weekday_{$hour}_task_{$taskNum}_completed"},
                        'points_earned' => $task->{"weekday_{$hour}_task_{$taskNum}_completed"} ? 10 : 0,
                    ];
                }
            }
        }

        // Tasks festivi
        foreach ($hours as $hour) {
            for ($taskNum = 1; $taskNum <= 3; $taskNum++) {
                $description = $task->{"weekend_{$hour}_task_{$taskNum}"};
                if ($description) {
                    $tasks[] = [
                        'id' => "weekend_{$hour}_task_{$taskNum}",
                        'description' => $description,
                        'time' => sprintf("%02d:00:00", $hour),
                        'type' => 'weekend',
                        'completed' => $task->{"weekend_{$hour}_task_{$taskNum}_completed"},
                        'points_earned' => $task->{"weekend_{$hour}_task_{$taskNum}_completed"} ? 10 : 0,
                    ];
                }
            }
        }

        return response()->json([
            'tasks' => $tasks,
            'points_earned' => $task->points_earned,
            'discipline_points' => $user->discipline_points ?? 0,
        ]);
    }

    public function createTask(Request $request)
    {
        $request->validate([
            'description' => 'required|string|max:255',
            'time' => 'required',
            'type' => 'required|in:weekday,weekend',
        ]);

        /** @var User $user */
        $user = Auth::user();
        $task = Task::firstOrCreate(['user_id' => $user->id], ['points_earned' => 0]);

        $hour = (int)explode(':', $request->time)[0];
        $type = $request->type;

        // Trova il primo slot disponibile per quell'orario
        for ($taskNum = 1; $taskNum <= 3; $taskNum++) {
            $field = "{$type}_{$hour}_task_{$taskNum}";
            if (!$task->$field) {
                $task->$field = $request->description;
                $task->save();
                return response()->json([
                    'message' => 'Task creato',
                    'task' => [
                        'id' => "{$type}_{$hour}_task_{$taskNum}",
                        'description' => $request->description,
                        'time' => sprintf("%02d:00:00", $hour),
                        'type' => $type,
                        'completed' => false,
                        'points_earned' => 0,
                    ]
                ]);
            }
        }

        return response()->json(['error' => 'Massimo 3 tasks per orario'], 422);
    }

    public function updateTask(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'description' => 'required|string|max:255',
            'time' => 'required',
            'type' => 'required|in:weekday,weekend',
        ]);

        /** @var User $user */
        $user = Auth::user();
        $task = Task::where('user_id', $user->id)->firstOrFail();

        $hour = (int)explode(':', $request->time)[0];
        $type = $request->type;
        $taskNum = (int)explode('_', $request->id)[3];

        $field = "{$type}_{$hour}_task_{$taskNum}";
        if (!$task->$field) {
            return response()->json(['error' => 'Task non trovato'], 404);
        }

        $task->$field = $request->description;
        $task->save();
        return response()->json(['message' => 'Task aggiornato']);
    }

    public function deleteTask($id)
    {
        /** @var User $user */
        $user = Auth::user();
        $task = Task::where('user_id', $user->id)->firstOrFail();

        $parts = explode('_', $id);
        $type = $parts[0];
        $hour = (int)$parts[1];
        $taskNum = (int)$parts[3];

        $field = "{$type}_{$hour}_task_{$taskNum}";
        $completedField = "{$field}_completed";

        $oldPointsEarned = $task->$completedField ? 10 : 0;
        $task->$field = null;
        $task->$completedField = false;

        if ($oldPointsEarned > 0) {
            $task->points_earned -= $oldPointsEarned;
            $user->discipline_points = ($user->discipline_points ?? 0) - $oldPointsEarned;
            // Riga di codice aggiunta per fix
            $user->total_points_earned_by_tasks_so_far = ($user->total_points_earned_by_tasks_so_far ?? 0) - $oldPointsEarned;
            $user->save();
        }

        $task->save();
        return response()->json(['message' => 'Task eliminato']);
    }

    public function completeTask(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'completed' => 'required|boolean',
        ]);

        Log::info('Complete task request received', ['request' => $request->all()]);

        try {
            /** @var User $user */
            $user = Auth::user();
            $task = Task::where('user_id', $user->id)->firstOrFail();

            $parts = explode('_', $request->id);
            $type = $parts[0];
            $hour = (int)$parts[1];
            $taskNum = (int)$parts[3];

            $field = "{$type}_{$hour}_task_{$taskNum}";
            $completedField = "{$field}_completed";

            Log::info('Task field check', ['field' => $field, 'exists' => !is_null($task->$field)]);

            if (!$task->$field) {
                Log::warning('Task not found', ['id' => $request->id]);
                return response()->json(['error' => 'Task non trovato'], 404);
            }

            $oldPointsEarned = $task->$completedField ? 10 : 0;
            $task->$completedField = $request->completed;
            $newPointsEarned = $request->completed ? 10 : 0;

            $task->points_earned += $newPointsEarned - $oldPointsEarned;
            $user->discipline_points = ($user->discipline_points ?? 0) + ($newPointsEarned - $oldPointsEarned);
            $user->total_points_earned_by_tasks_so_far = ($user->total_points_earned_by_tasks_so_far ?? 0) + ($newPointsEarned - $oldPointsEarned);

            Log::info('Before saving', [
                'task_points_earned' => $task->points_earned,
                'user_discipline_points' => $user->discipline_points,
                'completed_field' => $completedField,
                'completed_value' => $task->$completedField
            ]);

            if (!$user->save()) {
                Log::error('Failed to save user');
                throw new \Exception('Failed to save user');
            }

            if (!$task->save()) {
                Log::error('Failed to save task');
                throw new \Exception('Failed to save task');
            }

            Log::info('Task and user saved successfully');

            return response()->json([
                'message' => 'Task aggiornato',
                'task' => [
                    'id' => $request->id,
                    'completed' => $task->$completedField,
                    'points_earned' => $newPointsEarned
                ],
                'points_earned' => $task->points_earned,
                'discipline_points' => $user->discipline_points
            ]);
        } catch (\Exception $e) {
            Log::error('Error in completeTask', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Errore durante l\'aggiornamento del task'], 500);
        }
    }

    // Reset di ogni task
     public function resetTasks($type)
    {
        if (!in_array($type, ['weekday', 'weekend'])) {
            return response()->json(['error' => 'Tipo non valido'], 422);
        }

        /** @var User $user */
        $user = Auth::user();
        $task = Task::where('user_id', $user->id)->firstOrFail();

        $pointsDeducted = 0;
        $hours = range(5, 22);

        // Resetta tutte le task del tipo specificato
        foreach ($hours as $hour) {
            for ($taskNum = 1; $taskNum <= 3; $taskNum++) {
                $field = "{$type}_{$hour}_task_{$taskNum}";
                $completedField = "{$field}_completed";

                if ($task->$field) {
                    if ($task->$completedField) {
                        $pointsDeducted += 10; // Deduci i punti se la task era completata
                    }
                    $task->$field = null;
                    $task->$completedField = false;
                }
            }
        }

        // Aggiorna i punti
        if ($pointsDeducted > 0) {
            $task->points_earned -= $pointsDeducted;
            $user->discipline_points = max(0, ($user->discipline_points ?? 0) - $pointsDeducted);
            $user->total_points_earned_by_tasks_so_far = max(0, ($user->total_points_earned_by_tasks_so_far ?? 0) - $pointsDeducted);
            $user->save();
        }

        $task->save();
        return response()->json(['message' => 'Tutte le task di tipo ' . $type . ' resettate']);
    }

    //Nuovo metodo per aggiornare tasks nel cambio password che ottiene con KDF una nuova chiave derivata per crittare e decrittare tasks


    public function updateAllTasks(Request $request)
    {
        $request->validate([
            'tasks' => 'required|array',
            'tasks.*.id' => 'required|string', // es. weekday_5_task_1
            'tasks.*.description' => 'required|string|max:3000', // adatto ai tuoi ciphertext
        ]);

        /** @var User $user */
        $user = Auth::user();

        try {
            DB::transaction(function () use ($request, $user) {
                $taskRecord = Task::where('user_id', $user->id)->first();

                if (!$taskRecord) {
                    throw new \Exception('Record task non trovato per l’utente.');
                }

                foreach ($request->tasks as $taskData) {
                    $column = $taskData['id'];

                    // Verifica che il campo esista nella tabella
                    if (!\Schema::hasColumn('tasks', $column)) {
                        \Log::warning("Campo '{$column}' non esiste nella tabella tasks.");
                        continue;
                    }

                    $taskRecord->{$column} = $taskData['description'];
                }

                $taskRecord->save();
            });

            return response()->json(['message' => 'Tutte le task sono state aggiornate correttamente'], 200);
        } catch (\Throwable $e) {
            \Log::error('Errore durante l’aggiornamento delle tasks: ' . $e->getMessage());
            return response()->json(['error' => 'Errore durante l’aggiornamento delle tasks'], 500);
        }
    }


}
