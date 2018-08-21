<?php 
    require_once __DIR__.'/../base/model.php';

    class Phonenumbers_Model extends Model {
        function __construct (){
            $this->table = 'phonenumbers';
        }
        
        function findActiveNumbers(){
            $results = $this->query('SELECT * FROM phonenumbers LEFT JOIN countries ON phonenumbers.countryIsoCode=countries.isoCode WHERE phonenumbers.isDeleted != 1;');
            return $results;
        }
        
        function findActiveById($id){
            $results = $this->query('SELECT * FROM phonenumbers p WHERE p.isDeleted != 1 AND p.id = '.$id.';');
            return $results;
        }
    }

?>