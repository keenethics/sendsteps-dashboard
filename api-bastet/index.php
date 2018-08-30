<?php 
    //Authentication API.
    //Acts as a guardian for frontend calls & for checks being made by the main Nova-API
    
    class BastetAPI {  
        public function setHeaders() {
            header_remove();// clear the old headers
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Content-type:application/json;charset=utf-8');
            header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
            return;
        }
        
        private function createToken(){
            
        }
        
        public function login($params = array()) {
            require_once __DIR__.'/models/login.php';
            new Login_Model();
            $username = isset($params[0])? $params[0] : NULL;
            $password = isset($params[1])? $params[1] : NULL;
            
            $login_model = new Login_Model();
            $result = $login_model->login($username, $password);
            if ($result === true){
                //Generate unique hash token here
                
                $authorized = true;
                $token = 'da213sdasdas90dasdas';
            } else {
                $authorized = false;
                $token = '';
            }
            
            return json_encode(array('authorized' => $authorized, 'token'=> $token));
        }
        
        public function checkAuth($token = '') {
            $authorized = false;
            if ($token === 'da213sdasdas90dasdas') {
                $authorized = true;
            } 
            
            return json_encode(array('authorized' => $authorized));
        }
    }
    
    
    
    $Bastet = new BastetAPI();
    $Bastet->setHeaders();
        
    if ($_POST && isset($_POST['function'])) {
        $function = $_POST['function'];
        $params = (isset($_POST['params']))? explode('---', $_POST['params']) : array();
        $result = $Bastet->$function($params);
        echo $result;
        exit();
    }