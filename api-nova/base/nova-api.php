<?php 
    require_once __DIR__."/../../api-common/errors.php";//Load Errors (just in case);
    class NovaAPI {
        public $userId;
        public $userType;
        public $userToken;
        
        public function setHeaders(){
            header_remove();// clear the old headers
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Content-type:application/json;charset=utf-8');
            header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
            return;
        }
        
        protected function isSuperAdmin(){
            if ($this->userType !== 'superadmin') {
                $errors = json_encode(array('General' => 'Permissions'));
                throw new Exception($errors);
            }
        }
        
        protected function getUserSessionId(){
            $userModel = $this->loadModel('users');
            $sessionId = $userModel->getSessionIdFromUserId($this->userId)['sessionId'];
            return $sessionId;
        }
        
        public function loadModel($model_name = ''){
            //Check model file exists
            if ($model_name == '' OR !in_array($model_name.'.php', scandir(__DIR__."/../models/"))) {
                $errors = json_encode(array('General' => 'ModelFileDoesNotExist'));
                throw new Exception($errors);
            }
            require_once __DIR__."/../models/".$model_name.'.php';
            
            
            $model_name = ucfirst($model_name).'_Model'; // Controller Classes have the first letter uppercase
            
            //Check model class exists
            if (!class_exists($model_name)) {
                $errors = json_encode(array('General' => 'ModelClassDoesNotExist'));
                throw new Exception($errors);
            }
            
            return new $model_name;
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