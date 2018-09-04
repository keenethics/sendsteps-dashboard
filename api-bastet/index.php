<?php 
    require_once __DIR__."/../api-common/errors.php";//Load Errors (just in case);
    
    try { 
        if (!$_POST || !isset($_POST['function'])) {
            throw new Exception('SpecifyFunction');
        }
        require_once __DIR__.'/base/bastet-api.php';
        $Bastet = new BastetAPI();
        $Bastet->setHeaders();
        
        $function = $_POST['function'];
        $params = (isset($_POST['params']))? (array) json_decode($_POST['params']): array();
        
        //Check method/function exists
        if (!method_exists('BastetAPI', $function)) {
            throw new Exception('MethodDoesNotExist');
        }

        $result = call_user_func_array(array($Bastet, $function), $params);
        echo $result;
        exit();
    } catch (Exception $e) {
        //Handle all API errors
        echo ($e->getMessage() == '')? '{"error":"Undefined error with Nova-API, in file '.$e->getFile().', at line '.$e->getLine().'"}' : '{"error":"'. $errorTexts[$e->getMessage()].'"}';   
        exit();
    }