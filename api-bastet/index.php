<?php 
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