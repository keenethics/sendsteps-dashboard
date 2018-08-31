<?php
    require_once __DIR__."/../api-common/errors.php";//Load Errors (just in case);
    
    try { 
        if (!$_POST OR !isset($_POST['controller']) OR !isset($_POST['function'])) {
            throw new Exception('SpecifyControllerAndFunction');
        }
        //Setup Variables & load controller
        $controller_name = $_POST['controller'];
        $function = $_POST['function'];
        $params = (isset($_POST['params']))? implode(',', explode('---', $_POST['params'])) : array();
        
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
        $controller->setHeaders();
        
        //Check method/function exists
        if (!method_exists($controller, $function)) {
            throw new Exception('MethodDoesNotExist');
        }
        $result = $controller->$function($params);
        echo $result;
        exit();
        
    } catch (Exception $e) {
        //Handle all API errors
        echo ($e->getMessage() == '')? '{"error":"Undefined error with Nova-API, in file '.$e->getFile().', at line '.$e->getLine().'"}' : '{"error":"'. $errorTexts[$e->getMessage()].'"}';   
        exit();
    }