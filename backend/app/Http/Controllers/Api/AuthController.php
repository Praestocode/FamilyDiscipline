<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        \Log::info('[PROD] Inizio metodo login', ['email' => $request->email]);
        
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        \Log::info('[PROD] Credenziali validate', $credentials);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            
             \Log::info('[PROD] Login riuscito', ['user_id' => $user->id]);
            
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 200);
        }

        \Log::warning('[PROD] Login fallito - credenziali non valide', ['email' => $request->email]);

        return response()->json([
            'message' => 'Credenziali non valide',
        ], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logout effettuato']);
    }
}
