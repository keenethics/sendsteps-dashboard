<?php
    require(__DIR__.'/../base/nova-api.php');
    class Phonenumbers extends NovaAPI {
        function getOverview(){
            $results = $this->query('SELECT * FROM phonenumbers;');
            $return = array(
                'content' => $results
            );
            echo json_encode($return);
        }
    }