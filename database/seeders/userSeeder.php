<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class userSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                'username' => 'admin',
                'login' => 'admin',
                'telephone_number' => '7 000 000 0000',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin'),
                'role_id' => 1,
            ]
        );
        DB::table('users')->insert(
            [
                'username' => Str::random(10),
                'login' => Str::random(10),
                'telephone_number' =>  '7'.Str::random(10),
                'email' => Str::random(10) . '@gmail.com',
                'password' => Hash::make('password'),
            ]
        );
    }
}
