<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class Cors
{
    public function handle(Request $request, Closure $next): Response
    {
        Log::info('CORS middleware called');
        $allowedOrigins = [
            'http://localhost:4200',
            'https://familydiscipline.it',
            'https://www.familydiscipline.it',
            'https://api.familydiscipline.it',
        ];

        $origin = $request->headers->get('Origin');

        $response = $next($request);

        if ($origin && in_array($origin, $allowedOrigins)) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
        }

        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        if ($request->getMethod() === 'OPTIONS') {
            $preflight = response()->json([], 200);

            if ($origin && in_array($origin, $allowedOrigins)) {
                $preflight->headers->set('Access-Control-Allow-Origin', $origin);
                $preflight->headers->set('Access-Control-Allow-Credentials', 'true');
            }

            $preflight->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            $preflight->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

            return $preflight;
        }

        return $response;
    }
}
