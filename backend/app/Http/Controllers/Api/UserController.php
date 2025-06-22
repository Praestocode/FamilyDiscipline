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
        $users = User::with('status')->select('id', 'name', 'discipline_points', 'status_id', 'profile_picture')->get();
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
}