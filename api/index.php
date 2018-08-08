<?php 

    //We need some authentication here & a fallback to the login page.
    
    if ($_POST) {
        
        require_once __DIR__."/base/errors.php";//Load Errors (just in case);
        //1 request = 1 function from 1 controller
        $controller_name = $_POST['controller'];
        $function = $_POST['function'];
        
        $params = (isset($_POST['params']))? implode(',', explode('---', $_POST['params'])) : array();
        
        //Some issue with safe mode on this.
        // if (file_exists("/controllers/$controller_name.php") == false){
        //     echo json_encode(['error' => stream_resolve_include_path("/controllers/$controller_name.php")]);
        // }
        
        require_once __DIR__."/controllers/$controller_name.php";
        $controller_name = ucfirst($controller_name); // Controller Classes have the first letter uppercase
        
        //Return error, if controller class does not exist
        if (!class_exists($controller_name)) {
            $api = new NovaAPI;
            $api->setHeaders();
            echo json_encode(['error' => $novaErrors['ControllerDoesNotExist']]);
            exit();
        }
        
        $controller = new $controller_name;
        $controller->setHeaders();
        
        //Return error, if method does not exist
        if (!method_exists($controller, $function)) {
            $api = new NovaAPI;
            $api->setHeaders();
            echo json_encode(['error' => $novaErrors['MethodDoesNotExist']]);
            exit();
        }
        
        $result = $controller->$function($params);
        echo $result;
        exit();
    }