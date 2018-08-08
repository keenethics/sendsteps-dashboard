<?php
    require_once __DIR__."/base/errors.php";//Load Errors (just in case);
    
    try { 
        if(!$_POST){
            throw new Exception ('NoPost');
        }
        //1 request = 1 function from 1 controller
        if(!isset($_POST['controller']) OR !isset($_POST['function'])){
            throw new Exception ('SpecifyControllerAndFunction');
        }
        //Setup Variables & load controller
        $controller_name = $_POST['controller'];
        $function = $_POST['function'];
        $params = (isset($_POST['params']))? implode(',', explode('---', $_POST['params'])) : array();
        
        $controller_list = scandir(__DIR__.'/controllers/');
        if (!in_array($controller_name.'.php', $controller_list)) {
            throw new Exception ('ControllerFileDoesNotExist');    
        }
        
        require_once __DIR__."/controllers/$controller_name.php";
        $controller_name = ucfirst($controller_name); // Controller Classes have the first letter uppercase
        
        //Check controller class exists
        if (!class_exists($controller_name)) {
            throw new Exception ('ControllerDoesNotExist');
        }
        
        $controller = new $controller_name;
        $controller->setHeaders();
        
        //Check method/function exists
        if (!method_exists($controller, $function)) {
            throw new Exception ('MethodDoesNotExist');
        }
        
        $result = $controller->$function($params);
        echo $result;
        exit();
        
    } catch (Exception $e) {
        if ($e->getMessage() == ''){
            echo 'Error: Undefined error with Nova-API';
        } else {
            echo 'Error: '. $novaErrors[$e->getMessage()];exit();   
        }
    }


 