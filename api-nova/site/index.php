<?php
    require_once __DIR__."/../../api-common/errors.php";//Load Errors (just in case);
    require_once __DIR__."/../../api-common/urls.php";//Load $internalURLs Array  
    
    try {
        $token = isset($_POST['token']) ? $_POST['token'] : '';
        if ($token == NULL || $token == ''){
            //  strlen($token) != 250){
            $errors = json_encode(array('General' => 'ValidTokenNotSet'));
            throw new Exception($errors);
        }
        $bastetParams = json_encode(array('token' => $token));
        // Get cURL resource
        $curl = curl_init();
        // Set some options - we are passing in a useragent too here
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $internalURLs['bastet'],
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
            $errors = json_encode(array('General' => 'ValidTokenNotSet'));
            throw new Exception($errors);
        }
        
        if (!$_POST OR !isset($_POST['controller']) OR !isset($_POST['function'])) {
            $errors = json_encode(array('General' => 'SpecifyControllerAndFunction'));
            throw new Exception($errors);
        }
        //Setup Variables & load controller
        $controller_name = $_POST['controller'];
        $function = $_POST['function'];
        $params = (isset($_POST['params']))? (array) json_decode($_POST['params']): array();
        // $params = (isset($_POST['params']))? explode('---', $_POST['params']) : array();

        if (!in_array($controller_name.'.php', scandir(__DIR__."/../controllers/"))) {
            $errors = json_encode(array('General' => 'ControllerFileDoesNotExist'));
            throw new Exception($errors);
        }
        require_once __DIR__."/../controllers/$controller_name.php";
        $controller_name = ucfirst($controller_name); // Controller Classes have the first letter uppercase
        
        //Check controller class exists
        if (!class_exists($controller_name)) {
            $errors = json_encode(array('General' => 'ControllerFileDoesNotExist'));
            throw new Exception($errors);
        }
        $controller = new $controller_name;
        //Populate properties & other silent functions
        $controller->userType = $resp->userType;
        $controller->userId = $resp->userId;
        $controller->userToken = $token;
        $controller->setHeaders();
        
        //Check method/function exists, then run the function
        if (!method_exists($controller, $function)) {
            $errors = json_encode(array('General' => 'MethodDoesNotExist'));
            throw new Exception($errors);
        }
        $result = call_user_func_array(array($controller, $function), $params);
        //Check result was returned
        if ($result === NULL) {
            $errors = json_encode(array('General' => 'MethodReturnedNull'));
            throw new Exception($errors);
        }
        echo $result;//Make some noise
        exit();
        
    } catch (Exception $e) {
        //Clear headers, in case we don't reach that point
        header_remove();// clear the old headers
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Content-type:application/json;charset=utf-8');
        header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
        
        
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
                "General" => "Undefined error with Nova-API, in file ".$e->getFile().", at line ".$e->getLine()
            ));
        }
        echo json_encode($returnError);
        exit();
    }