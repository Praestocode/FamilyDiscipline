<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function index()
    {
        $baseUrl = env('APP_URL', 'http://localhost:8000');
        //$baseUrl = env('APP_URL');
        $statuses = Status::all()->map(function ($status) use ($baseUrl) {
            return [
                'id' => $status->id,
                'name' => $status->name,
                'points_required' => $status->required_points,
                'icon' => "$baseUrl/{$status->icon_path}"
            ];
        });

        return response()->json($statuses);
    }
}

