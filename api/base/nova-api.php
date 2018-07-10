<?php 
    class NovaAPI {
        
        
        public function setHeaders(){
            header_remove();// clear the old headers
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: http://localhost:3000');
            header('Content-type:application/json;charset=utf-8');
            header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
            return;
        }
        
        public function startMedoo(){
            require __DIR__.'/medoo/src/Medoo.php';
            use Medoo\Medoo;
            // $db_options = array(	
            //     // required
            //     'database_type' => 'mysql',
            //     'database_name' => 'addins',
            //     'server' => 'localhost',
            //     'username' => 'root',
            //     'password' => '',
             
            //     // [optional]
            //     'charset' => 'utf8mb4',
            //     'port' => 3306,
             
            //     // [optional] Table prefix
            //     // 'prefix' => 'PREFIX_',
             
            //     // [optional] Enable logging (Logging is disabled by default for better performance)
            //     'logging' => true,
             
            //     // [optional] MySQL socket (shouldn't be used with server and port)
            //     'socket' => '/tmp/mysql.sock',
             
            //     // [optional] driver_option for connection, read more from http://www.php.net/manual/en/pdo.setattribute.php
            //     'option' => [
            //         PDO::ATTR_CASE => PDO::CASE_NATURAL
            //     ],
             
            //     // [optional] Medoo will execute those commands after connected to the database for initialization
            //     'command' => [
            //         'SET SQL_MODE=ANSI_QUOTES'
            //     ]         
            // );
            
            // $database = new Medoo($db_options);
            
            // // var_dump($database);exit();
            
            // $data = $database->select('accounts', [
            //     'id',
            //     'timezone'
            // ], [
            //     'id' => 87
            // ]);
            
            // return json_encode($data);
        //     var_dump($db);exit();
        }
    }

    
    // // Return a proper status code 
    // $code = 200;
    // http_response_code($code);
    // $status = array(
    //     200 => '200 OK',
    //     400 => '400 Bad Request',
    //     422 => 'Unprocessable Entity',
    //     500 => '500 Internal Server Error'
    // );
    // header('Status: '.$status[$code]);