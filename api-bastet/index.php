<?php 
    //Authentication API.
    //Acts as a guardian for frontend calls & for checks being made by the main Nova-API
    class BastetAPI {  
        public function setHeaders(){
            header_remove();// clear the old headers
            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Content-type:application/json;charset=utf-8');
            header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
            return;
        }
    }
    $Bastet = new BastetAPI();

    $Bastet->setHeaders();
    echo json_encode(
        array(
            'authorized' => true
        )
    );
    exit();