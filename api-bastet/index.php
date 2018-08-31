<?php 
    require_once __DIR__."/../api-common/errors.php";//Load Errors (just in case);
    
    try { 
        require_once __DIR__.'/base/bastet-api.php';
        $Bastet = new BastetAPI();
        $Bastet->setHeaders();
            
        if ($_POST && isset($_POST['function'])) {
            $function = $_POST['function'];
            $params = (isset($_POST['params']))? explode('---', $_POST['params']) : array();
            $result = $Bastet->$function($params);
            echo $result;
            exit();
        }
    } catch (Exception $e) {
        //Handle all API errors
        echo ($e->getMessage() == '')? '{"error":"Undefined error with Nova-API, in file '.$e->getFile().', at line '.$e->getLine().'"}' : '{"error":"'. $errorTextEN[$e->getMessage()].'"}';   
        exit();
    }