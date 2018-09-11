<?php 
    require_once __DIR__.'/../../api-common/base/model.php';

    class Phonenumbers_Model extends Model {
        function findActiveNumbers(){
            $results = $this->query('SELECT * FROM phonenumbers LEFT JOIN countries ON phonenumbers.countryIsoCode=countries.isoCode WHERE phonenumbers.isDeleted != 1;');
            return $results;
        }
        
        function findActiveById($id){
            $query = 'SELECT * FROM phonenumbers p WHERE p.isDeleted != 1 AND <p.id> = :id;';
            $params['id'] = $id;
            $results = $this->query($query, $params);
            return $results;
        }
    }

?>