<?php
    //Authentication API - Acts as a guardian for frontend calls & for checks being made by the main Nova-API
    class BastetAPI {
        public function checkAuth($token = '') {
            $auth_model = $this->loadAuthModel();
            $authorized = (($auth_model->validateToken($token) == true) ? true : false);            
            return json_encode(array('authorized' => $authorized));
        }
        
        private function loadAuthModel(){
            require_once __DIR__.'/../models/auth.php';
            $auth_model = new Auth_Model();
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
        
        public function register($username = '', $password = '', $termsAccepted = false, $first_name = '', $last_name = ''){
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