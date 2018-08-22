<?php 

// var_dump($_POST);exit();
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
        
        public function login($username = '', $password = '') {
            return json_encode(
                array(
                    'authorized' => true,
                    'hash' => 'da213sdasdas90dasdas',
                )
            );
        }
        
        public function checkAuth($hash = '') {
            $authorized = false;
            if ($hash === 'da213sdasdas90dasdas') {
                $authorized = true;
            } 
            
            return json_encode(array('authorized' => $authorized));
        }
    }
    $Bastet = new BastetAPI();

    $Bastet->setHeaders();
        
    if ($_POST && isset($_POST['function'])) {
        $function = $_POST['function'];
        $params = (isset($_POST['params']))? implode(',', explode('---', $_POST['params'])) : array();
        
        $result = $Bastet->$function($params);
        echo $result;
        exit();
    }