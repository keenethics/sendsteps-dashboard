<?php
    require_once __DIR__."/../api-common/errors.php";//Load Errors (just in case);
    
    try {
        $token = isset($_POST['token']) ? $_POST['token'] : '';
        if ($token == NULL || $token == '' || strlen($token) != 250){
            throw new Exception('ValidTokenNotSet');
        }
        $bastetParams = json_encode(array('token' => $token));
        // Get cURL resource
        $curl = curl_init();
        // Set some options - we are passing in a useragent too here
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => 'http://local-bastet.sendsteps.com/index.php',
            CURLOPT_USERAGENT => 'Codular Sample cURL Request',
            CURLOPT_POST => 1,
            CURLOPT_POSTFIELDS => array(
                'function' => 'checkAuth',
                'params' => $bastetParams
            )
        ));
        // Send the request & save response to $resp
        $resp = json_decode(curl_exec($curl));
        // Close request to clear up some resources
        curl_close($curl);
        if ($resp->authorized != true){
            throw new Exception('ValidTokenNotSet');
        }
        
        if (!$_POST OR !isset($_POST['controller']) OR !isset($_POST['function'])) {
            throw new Exception('SpecifyControllerAndFunction');
        }
        //Setup Variables & load controller
        $controller_name = $_POST['controller'];
        $function = $_POST['function'];
        $params = (isset($_POST['params']))? (array) json_decode($_POST['params']): array();
        // $params = (isset($_POST['params']))? explode('---', $_POST['params']) : array();
        
        if (!in_array($controller_name.'.php', scandir(__DIR__."/controllers/"))) {
            throw new Exception('ControllerFileDoesNotExist');    
        }
        require_once __DIR__."/controllers/$controller_name.php";
        $controller_name = ucfirst($controller_name); // Controller Classes have the first letter uppercase
        
        //Check controller class exists
        if (!class_exists($controller_name)) {
            throw new Exception('ControllerClassDoesNotExist');
        }
        $controller = new $controller_name;
        //Populate properties & other silent functions
        $controller->userType = $resp->userType;
        $controller->userId = $resp->userId;
        $controller->setHeaders();
        
        //Check method/function exists, then run the function
        if (!method_exists($controller, $function)) {
            throw new Exception('MethodDoesNotExist');
        }
        $result = call_user_func_array(array($controller, $function), $params);
        echo $result;//Make some noise
        exit();
        
    } catch (Exception $e) {
        $returnError = array();
        if ($e->getMessage() != '') {
            $messages = (array) json_decode($e->getMessage());
            foreach ($messages as $errorElement => $errorKey) {
                if ( isset( $bastetErrors[$errorKey] ) ) {
                    $returnError['error'][$errorElement] = $bastetErrors[$errorKey];
                } else if ( isset( $generalErrors[$errorKey] ) ) {
                    $returnError['error'][$errorElement] = $generalErrors[$errorKey];
                }
            }
        }
        if (!count($returnError)){
            //Generic Error, if no message or index is found
            $returnError = array("error" => array(
                "General" => "Undefined error with Bastet-API, in file '.$e->getFile().', at line '.$e->getLine().'"
            ));
        }
        echo json_encode($returnError);
        exit();
    }