<?php
    require_once __DIR__.'/../../api-common/base/base.php';
    //Authentication API - Acts as a guardian for frontend calls & for checks being made by the main Nova-API
    class BastetAPI extends Base {
        public function checkAuth($token = '') {
            $auth_model = $this->loadAuthModel();
            $authorized = (($auth_model->validateToken($token) == true) ? true : false);
            $return['authorized'] = $authorized;
            if ($authorized == true) {
                $userProps = $auth_model->tokenToUserProps($token);
                $return['userType'] = $userProps['userType'];
                $return['userId'] = $userProps['userId'];
            }
            return json_encode($return);
        }
        
        private function loadAuthModel(){
            require_once __DIR__.'/../models/auth.php';
            $auth_model = new Auth_Model();
            // var_dump('asdasd');exit();
            return $auth_model;
        }
        private function loadRegistrationModel(){
            require_once __DIR__.'/../models/registration.php';
            $auth_model = new Registration_Model();
            return $auth_model;
        }
        
        public function login($username = '', $password = '') {
            
            $auth_model = $this->loadAuthModel();
            $result = $auth_model->login($username, $password);
            if ($result === true){
                //Generate unique hash token here
                $authorized = true;
                $token = $auth_model->createToken($username);
            } else {
                $authorized = false;
                $token = '';
            }
            return json_encode(array('authorized' => $authorized, 'token'=> $token));
        }
        
        public function register($username = '', $password = '',  $passwordConfirm = '', $options = array()){
            $errors = array();
            if ($username == 'bryan.overduin@sendsteps.com'){
                $errors['Username'] = 'UsernameBlank';  
            }
            
            if ($password != $passwordConfirm){
                $errors['Password'] = 'PasswordDoNotMatch';    
            }
            
            $this->errorCheck($errors);
            
            foreach($options as $opt){
                
            }
            
            $reg_model = $this->loadRegistrationModel();
            $result = $reg_model->register($username, $password);
            return $result;
        }
        
        public function setHeaders() {
            header_remove();// clear the old headers
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Content-type:application/json;charset=utf-8');
            header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
            return;
        }
        
    }