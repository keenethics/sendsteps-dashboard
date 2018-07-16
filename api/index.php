<?php 

    //We need some authentication here & a fallback to the login page.

    
    // $_POST['controller'] = 'phonenumbers';
    // $_POST['function'] = 'test';
    
    if($_POST){
        //1 request = 1 function from 1 controller
        $controller_name = $_POST['controller'];
        $function = $_POST['function'];
        require __DIR__."/controllers/$controller_name.php";
        $controller_name = ucfirst($controller_name); // Controller Classes have the first letter uppercase
        $controller = new $controller_name;
        $controller->setHeaders();
        $controller->$function();
    }