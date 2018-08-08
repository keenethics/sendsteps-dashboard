<?php
require_once __DIR__.'/../base/nova-api.php';

class Phonenumbers extends NovaAPI {
    function getOverview(){
        $results = $this->query('SELECT * FROM phonenumbers LEFT JOIN countries ON phonenumbers.countryIsoCode=countries.isoCode WHERE phonenumbers.isDeleted != 1;;');
        return json_encode(['content' => $results]);
    }

    function getDetails($id = NULL) {
        // Fetch data from single phonenumber
        if($id != NULL){
            $results = $this->query('SELECT * FROM phonenumbers p WHERE p.isDeleted != 1 AND p.id = '.$id.';');
            return json_encode(['content' => $results]);                
        }
        return false;
        // $results = $this->query('SELECT * FROM phonenumbers WHERE phonenumbers.id = '.$phonenumberId.' phonenumbers.isDeleted != 1 AND id = 2;');
        // return json_encode(['content' => $results]);
        
    }
}