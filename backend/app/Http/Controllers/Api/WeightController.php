<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Weight;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WeightController extends Controller
{
    public function getStatus()
    {
        /** @var User $user */
        $user = Auth::user();

        /** @var Weight $weight */
        $weight = Weight::firstOrCreate(
            ['user_id' => $user->id],
            [
                'starting_weight' => 0,
                'current_weight' => 0,
                'ideal_weight' => 0,
                'points_earned' => 0,
                'date' => now()->toDateString(),
            ]
        );

        // Ricalcola points_earned dinamicamente
        $oldPointsEarned = $weight->points_earned;
        if ($weight->starting_weight > 0 && $weight->ideal_weight > 0 && $weight->current_weight > 0) {
            $weightLoss = round($weight->starting_weight - max($weight->current_weight, $weight->ideal_weight), 2);
            $weight->points_earned = $weightLoss > 0 ? $weightLoss * 200 : 0;

            if ($weight->current_weight <= $weight->ideal_weight) {
                $weight->points_earned += 5000;
            }
        } else {
            $weight->points_earned = 0;
        }

        // Aggiorna discipline_points solo se points_earned cambia
        if ($oldPointsEarned != $weight->points_earned) {
            $user->discipline_points = ($user->discipline_points ?? 0) - $oldPointsEarned + $weight->points_earned;
            $user->save();
        }

        // Salva eventuali modifiche a weight
        if ($weight->isDirty()) {
            $weight->save();
        }

        return response()->json([
            'starting_weight' => $weight->starting_weight,
            'current_weight' => $weight->current_weight,
            'ideal_weight' => $weight->ideal_weight,
            'points_earned' => $weight->points_earned,
            'discipline_points' => $user->discipline_points ?? 0,
        ]);
    }

    public function updateWeights(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        $request->validate([
            'starting_weight' => 'nullable|numeric|min:0|max:120',
            'ideal_weight' => 'nullable|numeric|min:0|max:120',
        ]);

        /** @var Weight $weight */
        $weight = Weight::firstOrCreate(
            ['user_id' => $user->id],
            ['date' => now()->toDateString()]
        );

        // Salva i vecchi points_earned
        $oldPointsEarned = $weight->points_earned;

        // Aggiorna solo i campi presenti nel payload
        if ($request->has('starting_weight')) {
            $weight->starting_weight = $request->starting_weight ?? 0;
        }

        if ($request->has('ideal_weight')) {
            $weight->ideal_weight = $request->ideal_weight ?? 0;
        }

        // Controlla che starting_weight >= ideal_weight se entrambi sono impostati
        if ($weight->starting_weight > 0 && $weight->ideal_weight > 0 && $weight->starting_weight < $weight->ideal_weight) {
            return response()->json([
                'error' => 'Il peso iniziale non può essere inferiore al peso ideale.'
            ], 422);
        }

        // Controlla che ideal_weight >= starting_weight - 40
        if ($weight->starting_weight > 0 && $weight->ideal_weight > 0 && $weight->ideal_weight < $weight->starting_weight - 60) {
            return response()->json([
                'error' => 'Il peso ideale non può essere inferiore al peso iniziale di più di 60 kg!'
            ], 422);
        }

        // Ricalcola points_earned se current_weight è impostato
        if ($weight->current_weight > 0 && $weight->starting_weight > 0 && $weight->ideal_weight > 0) {
            $weightLoss = round($weight->starting_weight - max($weight->current_weight, $weight->ideal_weight), 2);
            $weight->points_earned = $weightLoss > 0 ? $weightLoss * 200 : 0;

            if ($weight->current_weight <= $weight->ideal_weight) {
                $weight->points_earned += 5000;
            }
        } else {
            $weight->points_earned = 0;
        }

        $weight->save();

        // Aggiorna discipline_points
        $user->discipline_points = ($user->discipline_points ?? 0) - $oldPointsEarned + $weight->points_earned;
        $user->save();

        return response()->json(['message' => 'Pesi aggiornati']);
    }

    public function updateCurrentWeight(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        $request->validate([
            'current_weight' => 'nullable|numeric|min:0|max:120',
        ]);

        /** @var Weight $weight */
        $weight = Weight::firstOrCreate(
            ['user_id' => $user->id],
            ['date' => now()->toDateString()]
        );

        // Salva i vecchi points_earned
        $oldPointsEarned = $weight->points_earned;

        // Gestisci valori null o 0
        $current_weight = $request->current_weight ?? 0;
        $weight->current_weight = $current_weight;

        // Calcola points_earned solo se starting_weight e ideal_weight sono impostati
        if ($weight->starting_weight > 0 && $weight->ideal_weight > 0 && $current_weight > 0) {
            $weightLoss = round($weight->starting_weight - max($weight->current_weight, $weight->ideal_weight), 2);
            $weight->points_earned = $weightLoss > 0 ? $weightLoss * 200 : 0;

            if ($weight->current_weight <= $weight->ideal_weight) {
                $weight->points_earned += 5000;
            }
        } else {
            $weight->points_earned = 0;
        }

        $weight->save();

        // Aggiorna discipline_points
        $user->discipline_points = ($user->discipline_points ?? 0) - $oldPointsEarned + $weight->points_earned;
        $user->save();

        return response()->json([
            'current_weight' => $weight->current_weight,
            'points_earned' => $weight->points_earned,
        ]);
    }

    public function resetWeights()
    {
        /** @var User $user */
        $user = Auth::user();

        /** @var Weight $weight */
        $weight = Weight::firstOrCreate(
            ['user_id' => $user->id],
            ['date' => now()->toDateString()]
        );

        // Salva i vecchi points_earned
        $oldPointsEarned = $weight->points_earned;

        // Azzera tutti i pesi e i punti
        $weight->starting_weight = 0;
        $weight->current_weight = 0;
        $weight->ideal_weight = 0;
        $weight->points_earned = 0;
        $weight->save();

        // Aggiorna discipline_points
        $user->discipline_points = ($user->discipline_points ?? 0) - $oldPointsEarned;
        $user->save();

        return response()->json(['message' => 'Pesi azzerati']);
    }
      }