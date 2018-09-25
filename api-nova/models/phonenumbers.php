<?php 
    require_once __DIR__.'/../../api-common/base/model.php';

    class Phonenumbers_Model extends Model {
        function findActiveNumbers(){
            $results = $this->query('SELECT *, (SELECT COUNT(id) FROM phonenumberkeywords pk WHERE pk.phoneNumberId = p.id) as keywordCount
            FROM phonenumbers p
            LEFT JOIN countries ON p.countryIsoCode=countries.isoCode
            WHERE p.isDeleted != 1;');
            return $results;
        }
        
        function findActiveById($id){
            $query = 'SELECT * FROM phonenumbers p WHERE p.isDeleted != 1 AND <p.id> = :id;';
            $params['id'] = $id;
            $results = $this->query($query, $params);
            return $results;
        }
        
        function findKeywordsByPhonenumberId($id){
            $query = 'SELECT id, keyword FROM phonenumberkeywords k WHERE <k.phoneNumberId> = :phoneNumberId;';
            $params['phoneNumberId'] = $id;
            $results = $this->query($query, $params);
            return $results;
        }
    }

?>