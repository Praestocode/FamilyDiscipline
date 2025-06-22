<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCigarettesTable extends Migration
{
    public function up()
    {
        Schema::create('cigarettes', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->primary();
            $table->integer('count')->default(0);
            $table->integer('limit')->default(10);
            $table->integer('consecutive_days')->default(0);
            $table->integer('consecutive_weeks')->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('cigarettes');
    }
}