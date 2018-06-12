<?php 
    require(__DIR__.'/base/nova-api.php');
    class Phonenumbers extends NovaAPI {
        function test(){
            echo 'test';
        }
    }
    
    $phonenumbers = new Phonenumbers;
    $phonenumbers->setHeaders();
    echo json_encode('daskljdakljdaskljdaskljdakljdaskljdaskljdakljdaskljdaskljdakljdaskljdaskljdakljdaskljdaskljdakljdaskljdaskljdakljdasklj');

