<?php
require_once __DIR__.'/../base/nova-api.php';

class Phonenumbers extends NovaAPI {
    function getOverview(){
        $results = $this->query('SELECT * FROM phonenumbers LEFT JOIN countries ON phonenumbers.countryIsoCode=countries.isoCode WHERE phonenumbers.isDeleted != 1;;');
        return json_encode(['content' => $results]);
    }

    function getSinglePhonenumberData($phonenumberId) {
        // Fetch data from single phonenumber
        $results = $this->query('SELECT * FROM phonenumbers WHERE phonenumbers.id = '.$phonenumberId.' phonenumbers.isDeleted != 1;');
        return json_encode(['content' => $results]);
        
    }
}