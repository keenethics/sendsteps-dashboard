<?php
    require(__DIR__.'/../base/nova-api.php');
    class Phonenumbers extends NovaAPI {
        function getOverview(){
            $results = $this->query('SELECT * FROM phonenumbers LEFT JOIN countries ON phonenumbers.countryIsoCode=countries.isoCode WHERE phonenumbers.isDeleted != 1;');
            $return = array(
                'content' => $results
            );
            echo json_encode($return);
        }
        function getRecord(){
            $results = $this->query('SELECT * FROM phonenumbers LEFT JOIN countries ON phonenumbers.countryIsoCode=countries.isoCode WHERE phonenumbers.isDeleted != 1 AND id = 1;');
            $return = array(
                'content' => $results
            );
            echo json_encode($return);
        }
    }