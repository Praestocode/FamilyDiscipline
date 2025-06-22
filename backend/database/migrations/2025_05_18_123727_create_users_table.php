<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->integer('discipline_points')->default(0);
            $table->unsignedBigInteger('status_id')->default(1);
            $table->foreign('status_id')->references('id')->on('statuses')->onDelete('restrict');
            $table->string('profile_picture')->nullable();
            $table->boolean('int_tasks')->default(false);
            $table->boolean('int_weight')->default(false);
            $table->boolean('int_smoke')->default(false);
            $table->timestamps();
        });

        // Aggiungi il vincolo CHECK con una query SQL raw
        DB::statement('ALTER TABLE users ADD CONSTRAINT check_objectives CHECK (int_tasks = true OR int_weight = true OR int_smoke = true)');
    }

    public function down()
    {
        // Rimuovi il vincolo CHECK prima di droppare la tabella
        DB::statement('ALTER TABLE users DROP CONSTRAINT check_objectives');
        Schema::dropIfExists('users');
    }
}