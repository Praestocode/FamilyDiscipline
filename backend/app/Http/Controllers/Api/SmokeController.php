<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cigarette;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SmokeController extends Controller
{
    public function getStatus()
    {
        $user = Auth::user();

        $cigarette = Cigarette::firstOrCreate(
            ['user_id' => $user->id],
            ['count' => 0, 'limit' => 10, 'consecutive_days' => 0, 'consecutive_weeks' => 0]
        );

        return response()->json([
            'count' => $cigarette->count,
            'limit' => $cigarette->limit,
            'consecutive_days' => $cigarette->consecutive_days,
            'consecutive_weeks' => $cigarette->consecutive_weeks,
            'points' => $user->discipline_points ?? 0,
        ]);
    }

    public function increment(Request $request)
    {
        $user = Auth::user();

        $cigarette = Cigarette::firstOrCreate(
            ['user_id' => $user->id],
            ['count' => 0, 'limit' => 10, 'consecutive_days' => 0, 'consecutive_weeks' => 0]
        );

        $cigarette->count++;
        $cigarette->save();

        return response()->json(['count' => $cigarette->count]);
    }

    public function decrement(Request $request)
    {
        $user = Auth::user();

        $cigarette = Cigarette::firstOrCreate(
            ['user_id' => $user->id],
            ['count' => 0, 'limit' => 10, 'consecutive_days' => 0, 'consecutive_weeks' => 0]
        );

        if ($cigarette->count > 0) {
            $cigarette->count--;
            $cigarette->save();
        }

        return response()->json(['count' => $cigarette->count]);
    }

    public function processDaily()
    {
        $users = User::where('int_smoke', true)->get();

        foreach ($users as $user) {
            $cigarette = Cigarette::where('user_id', $user->id)->first();

            if ($cigarette) {
                $count = $cigarette->count;
                $limit = $cigarette->limit;

                if ($count <= $limit) {
                    // Limite rispettato
                    $user->increment('discipline_points', 50);
                    $cigarette->consecutive_days++;

                    if ($cigarette->consecutive_days >= 7) {
                        $cigarette->consecutive_weeks++;
                        $cigarette->consecutive_days = 0;
                    }

                    if ($cigarette->consecutive_weeks >= 3 && $cigarette->limit > 0) {
                        $cigarette->limit--;
                        $cigarette->consecutive_weeks = 0;
                        $cigarette->consecutive_days = 0;
                    }
                } else {
                    // Limite superato
                    $cigarette->consecutive_days = 0;
                    $cigarette->consecutive_weeks = 0;
                }

                $cigarette->count = 0;
                $cigarette->save();
            }
        }

        return response()->json(['message' => 'Daily smoke processing completed']);
    }
}