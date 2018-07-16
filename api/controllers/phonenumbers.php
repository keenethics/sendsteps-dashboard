<?php
    require(__DIR__.'/../base/nova-api.php');
    class Phonenumbers extends NovaAPI {
        function test(){
            $results = $this->query('SELECT * FROM accounts LIMIT 10;');
            $return = array(
                'content' => $results
            );
            echo json_encode($return);
        }
    }