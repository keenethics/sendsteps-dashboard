<?php 

    require_once __DIR__.'/../base/base.php';
    require_once __DIR__.'/../errors.php';//Load Errors (just in case);
    require_once __DIR__.'/../medoo/src/Medoo.php';
    use Medoo\Medoo;

    class Model extends Base{
        public function findAll(){
            $results = $this->query('SELECT * FROM '.$this->table.';');
            return $results;
        }
        public function findById($id = NULL){
            if($id == NULL){
                throw new Exception('ModelRequiresId');
            }
            $results = $this->query('SELECT * FROM '.$this->table.';');
            return $results;
        }

        public function query($query = '', $params = array()) {            
            $db_options = $this->getMedooOptions();
            $database = new Medoo($db_options);
            $data = (array) $database->query($query, $params)->fetchAll(PDO::FETCH_ASSOC);//PDO::FETCH_ASSOC Forces db queries to return only named indicies
            return $data;
        }
        
        public function isPhp7(){
            if (version_compare(PHP_VERSION, '7.0.0') >= 0) {
                return true;
            }
            return false;
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
                'charset' => 'utf8mb4', //Make sure emojis render
                'logging' => true, // Enable logging (Logging is disabled by default for better performance)
                'socket' => '/tmp/mysql.sock', // MySQL socket (shouldn't be used with server and port)
                'option' => [ PDO::ATTR_CASE => PDO::CASE_NATURAL ], // Driver_option for connection, read more from http://www.php.net/manual/en/pdo.setattribute.php
                'command' => [ 'SET SQL_MODE=ANSI_QUOTES' ] // Medoo will execute those commands after connected to the database for initialization
            );
            return $db_options;
        }
    }

?>