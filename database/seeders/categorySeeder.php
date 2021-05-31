<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class categorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert(
            [
                'title' => 'Информационные системы и программирование(web)',
                'desc' => 'Описание',
            ]
        );
        DB::table('categories')->insert(
            [
                'title' => 'Информационные системы и программирование',
                'desc' => 'Описание',
            ]
        );
        DB::table('categories')->insert(
            [
                'title' => 'Системные администратрор',
                'desc' => 'Описание',
            ]
        );
    }
}
