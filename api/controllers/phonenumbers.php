<?php
    require(__DIR__.'/../base/nova-api.php');
    class Phonenumbers extends NovaAPI {
        function test(){
            $return = array(
                'content' => 'Test agasdsain'
            );
            echo json_encode($return);
        }
    }