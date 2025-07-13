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
        // Log solo in ambiente non di produzione, se vuoi
        if (app()->environment('local', 'staging')) {
            \Log::info('[DEBUG] Inizio metodo login', ['email' => $request->email]);
        }
        
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Log solo l'email, mai la password
        \Log::info('[PROD] Credenziali validate', ['email' => $credentials['email']]);

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
