<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('points_earned')->default(0);

            // Colonne per i giorni feriali (weekday)
            foreach (range(5, 22) as $hour) {
                for ($taskNum = 1; $taskNum <= 3; $taskNum++) {
                    $table->text("weekday_{$hour}_task_{$taskNum}")->nullable();
                    $table->boolean("weekday_{$hour}_task_{$taskNum}_completed")->default(false);
                }
            }

            // Colonne per i giorni festivi (weekend)
            foreach (range(5, 22) as $hour) {
                for ($taskNum = 1; $taskNum <= 3; $taskNum++) {
                    $table->text("weekend_{$hour}_task_{$taskNum}")->nullable();
                    $table->boolean("weekend_{$hour}_task_{$taskNum}_completed")->default(false);
                }
            }

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}