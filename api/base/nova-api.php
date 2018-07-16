<?php 
    require __DIR__.'/medoo/src/Medoo.php';
    use Medoo\Medoo;
    
    class NovaAPI {
        
        public function setHeaders(){
            header_remove();// clear the old headers
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: http://localhost:3000');
            header('Content-type:application/json;charset=utf-8');
            header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
            return;
        }
        
        public function namespaceExists($namespace) {
            $namespace .= "\\";
            foreach(get_declared_classes() as $name)
                if(strpos($name, $namespace) === 0) return true;
            return false;
        }
        
        public function query($query) {            
            $db_options = $this->getMedooOptions();
            $database = new Medoo($db_options);
            $data = $database->query($query)->fetchAll();
            return json_encode($data);
        }
        
        private function getMedooOptions(){
            $db_options = array(
                // Required
                'database_type' => 'mysql',
                'database_name' => 'addins',
                'server' => 'localhost',
                'username' => 'root',
                'password' => '',
                'port' => 3306,

                // Optional
                'charset' => 'utf8mb4',
                'logging' => true, // Enable logging (Logging is disabled by default for better performance)
                'socket' => '/tmp/mysql.sock', // MySQL socket (shouldn't be used with server and port)
                'option' => [ PDO::ATTR_CASE => PDO::CASE_NATURAL ], // Driver_option for connection, read more from http://www.php.net/manual/en/pdo.setattribute.php
                'command' => [ 'SET SQL_MODE=ANSI_QUOTES' ] // Medoo will execute those commands after connected to the database for initialization
            );
            return $db_options;
        }
    }

    
    // // Return a proper status code 
    // $code = 200;
    // http_response_code($code);
    // $status = array(
    //     200 => '200 OK',
    //     400 => '400 Bad Request',
    //     422 => '422 Unprocessable Entity',
    //     500 => '500 Internal Server Error'
    // );
    // header('Status: '.$status[$code]);