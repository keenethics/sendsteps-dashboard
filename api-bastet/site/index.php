<?php 
    require_once __DIR__."/../../api-common/errors.php";//Load Errors (just in case);
    
    try { 
        $errors = array();
        if (!$_POST || !isset($_POST['function'])) {
            $errors['General'] = 'SpecifyFunction';   
        }
        require_once __DIR__.'/../base/bastet-api.php';
        $Bastet = new BastetAPI();
        $Bastet->setHeaders();
        
        $function = (isset($_POST['function']))?  $_POST['function']: '';

        $params = (isset($_POST['params']))? (array) json_decode($_POST['params']): array();
        
        //Check method/function exists
        if ($function == '' || !method_exists('BastetAPI', $function)) {
            $errors['General'] = 'MethodDoesNotExist';   
        }
        $Bastet->errorCheck($errors);//Check there are no errors before proceeding
        
        $result = call_user_func_array(array($Bastet, $function), $params);
        echo $result;
        exit();
    } catch (Exception $e) { //Handle all API errors
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
                "General" => "Undefined error with Bastet-API, in file ".$e->getFile().", at line ".$e->getLine()
            ));
        }
        echo json_encode($returnError);
        exit();
    }