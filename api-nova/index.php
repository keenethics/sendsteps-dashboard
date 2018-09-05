<?php
    require_once __DIR__."/../api-common/errors.php";//Load Errors (just in case);
    
    try {
        // $token = 'df58c2a39095d4a93ca4b6e566610007b8357fb6436b19016be717d3c3bad59a36ffabc373c223ae900d05dae8bc7b823a42dfee619c2768e2e4fb8ef310f01bb6166c266e749564474d31c884a49ced3e23234c4865dbf78096c3c7047e6bda7086b34e6c34ea1029c31bc23c5c58a280d46f0a08472aad50b5a356d9';
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
        //Handle all API errors
        echo ($e->getMessage() == '')? '{"error":"Undefined error with Nova-API, in file '.$e->getFile().', at line '.$e->getLine().'"}' : '{"error":"'. $generalErrors[$e->getMessage()].'"}';   
        exit();
    }