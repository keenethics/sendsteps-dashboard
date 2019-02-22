<?php
    require __DIR__.'/../../api-common/base/base.php';
    //Authentication API - Acts as a guardian for frontend calls & for checks being made by the main Nova-API
    class BastetAPI extends Base {
        public function checkAuth($token = '') {
            $auth_model = $this->loadAuthModel();
            $authorized = (($auth_model->validateToken($token) == true) ? true : false);
            if ($authorized == true) {
                $userId = $auth_model->tokenToUserProps($token)['userId'];
                $return = $auth_model->getPostLoginInfo($userId);
                $userProps = $auth_model->tokenToUserProps($token);
                $return['authorized'] = $authorized;
                $return['userType'] = $userProps['userType'];
                $return['userId'] = $userId;
            }
            return json_encode($return);
        }
        
        private function loadAuthModel(){
            require __DIR__.'/../models/auth.php';
            $auth_model = new Auth_Model();
            return $auth_model;
        }
        private function loadRegistrationModel(){
            require __DIR__.'/../models/registration.php';
            $auth_model = new Registration_Model();
            return $auth_model;
        }
        
        public function login($username = '', $password = '') {
            $auth_model = $this->loadAuthModel();
            $result = $auth_model->login($username, $password);
            //Initalise Variables
            $authorized = false;
            $token = '';
            $postLoginInfo = array();
            if ($result === true){ //Generate unique hash token here
                $authorized = true;
                $token = $auth_model->createToken($username);
                $userId = $auth_model->tokenToUserProps($token)['userId'];
                $postLoginInfo = $auth_model->getPostLoginInfo($userId);
                $postLoginInfo['authorized'] = $authorized;
                $postLoginInfo['token'] = $token;
                ksort($postLoginInfo);
            } 
            return json_encode($postLoginInfo);
        }
        
        public function register($username = '', $password = '',  $passwordConfirm = '', $options = array()){
            $errors = array();
            if ($username == ''){
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