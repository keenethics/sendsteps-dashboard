<?php
    //Authentication API - Acts as a guardian for frontend calls & for checks being made by the main Nova-API
    class BastetAPI {
        public function checkAuth($token = '') {
            // var_dump('someunique: '.$token);exit();
            $auth_model = $this->loadAuthModel();
            $authorized = (($auth_model->validateToken($token) == true) ? true : false);            
            return json_encode(array('authorized' => $authorized));
        }
        
        private function loadAuthModel(){
            require_once __DIR__.'/../models/auth.php';
            $auth_model = new Auth_Model();
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
        
        public function setHeaders() {
            header_remove();// clear the old headers
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Content-type:application/json;charset=utf-8');
            header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
            return;
        }
    }