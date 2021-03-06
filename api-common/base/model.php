<?php 

    require_once __DIR__.'/../base/base.php';
    require_once __DIR__.'/../errors.php';//Load Errors (just in case);
    require_once __DIR__.'/../medoo/src/Medoo.php';
    use Medoo\Medoo;

    class Model extends Base {
        
        protected function database(){
            return new Medoo($this->getMedooOptions());
        }

        // Returns associative array of key id unless specified otherwise
        // e.g: { 18: {userName: test}, 53: { userName: test2 } } 
        // instead of incremental array indexes
        protected function formatAssociative($listToFormat, $key = 'id') {
            if((count($listToFormat) > 0) && (is_array($listToFormat))) {
                $assocList = array();
                foreach($listToFormat as $listItem) {
                    $assocList[$listItem[$key]] = $listItem;
                }
                return $assocList;
            }
            return ['error' => 'Expected array but got: '. gettype($listToFormat)];
        }
        
        protected function findByIdCentral($id = NULL, $table = '', $booleanColumn = '') {
            $database = new Medoo($this->getMedooOptions());
            if (NULL == $id) {
                throw new Exception('ModelRequiresId');
            }
            if ('' == $table) {
                throw new Exception('ModelRequiresTable');
            }
            if ('' != $booleanColumn) {
                $where[$booleanColumn] = 0; //Select only rows, that have not been marked as deleted
            }
            $where['id'] = $id;
            $where['LIMIT'] = 1;
            $results = $database->select($table, '*', $where);
            return $results;
        }

        protected function query($query = '', $params = array()) {        
            $database = new Medoo($this->getMedooOptions());
            
            if (count($params)) {
                $data = (array) $database->query($query, $params)->fetchAll(PDO::FETCH_ASSOC);//PDO::FETCH_ASSOC Forces db queries to return only named indicies
            } else {
                $data = (array) $database->query($query)->fetchAll(PDO::FETCH_ASSOC);//PDO::FETCH_ASSOC Forces db queries to return only named indicies
            }
            return $data;
        }
        
        protected function insertOn($table = '', $fields = array(), $id = NULL) {
            // return 'asdasd';
            if (count($fields)) {
                $database = new Medoo($this->getMedooOptions());
                if (NULL != $id) { //Update existing record
                    $where['id'] = $id;
                    $results = $database->update($table, $fields, $where);
                    if (00000 != $results->errorCode()){                 
                        var_dump($results->errorInfo());exit(); //Add some proper error catching for this.
                    }
                    $returnedId = $id;
                } else { // insert new record with the data we've been given
                    $results = $database->insert($table, $fields);
                    if (00000 != $results->errorCode()){                 
                        var_dump($results->errorInfo());exit(); //Add some proper error catching for this.
                    }
                    $returnedId = $database->id();
                }
            } else {
                throw new Exception('ModelRequiresId');
            }
            return $returnedId;
        }
        
        protected function isPhp7() {
            if (version_compare(PHP_VERSION, '7.0.0') >= 0) {
                return true;
            }
            return false;
        }
        
        private function getMedooOptions() {
            require_once __DIR__."/../db-connect/settings.php";
            require_once __DIR__."/../db-connect/mysql.inc.php";
            $pdo = MySQL::GetConnection();
            $db_options = array(
                'database_type' => DB_TYPE,
                'database_name' => DB_DATABASE,
                'server' => DB_SERVER,
                'username' => DB_USERNAME,
                'password' => DB_PASSWORD,
                'port' => DB_PORT,
                'charset' => DB_CHARSET,
                'logging' => DB_LOGGING,
                'command' => [ DB_COMMAND ], //Medoo will execute those commands after connected to the database for initialization
                'pdo' => $pdo
            );            
            // // Optional extras for the database
            // $db_options['socket'] = '/tmp/mysql.sock'; // MySQL socket (shouldn't be used with server and port)
            // $db_options['option'] = [ PDO::ATTR_CASE => PDO::CASE_NATURAL ]; // Driver_option for connection, read more from http://www.php.net/manual/en/pdo.setattribute.php
          
            return $db_options;
        }
    }
?>