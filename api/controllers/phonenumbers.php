<?php
    require(__DIR__.'/../base/nova-api.php');
    class Phonenumbers extends NovaAPI {
        function test(){
            $results = $this->query('');
            $return = array(
                'content' => $this->startMedoo()
            );
            echo json_encode($return);
        }
    }