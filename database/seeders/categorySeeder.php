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
                'img_src' => 'https://college-gsc.ru/wp-content/uploads/2020/05/nicole-wolf-cz9ajmgkifi-unsplash-1024x683.jpg',
                'desc' => 'Описание',
            ]
        );
        DB::table('categories')->insert(
            [

                'title' => 'Информационные системы и программирование',
                'img_src' =>'https://cdn.postupi.online/images/images328x182/38/438.jpg',
                'desc' => 'Описание',
            ]
        );
        DB::table('categories')->insert(
            [
                'title' => 'Системный администратор',
                'img_src' => 'https://cdn.postupi.online/images/images328x182/03/026.jpg',
                'desc' => 'Описание',
            ]
        );
    }
}
