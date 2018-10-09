<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Phonenumbers_Model extends Model {
    public function findActiveNumbers(){
        $results = $this->query('SELECT *, (SELECT COUNT(id) FROM phonenumberkeywords pk WHERE pk.phoneNumberId = p.id) as keywordCount
        FROM phonenumbers p
        LEFT JOIN countries ON p.countryIsoCode=countries.isoCode
        WHERE p.isDeleted != 1;');
        return $results;
    }
    
    public function findActiveById($id){
        $results = $this->findByIdCentral($id, 'phonenumbers', 'isDeleted');
        // $query = 'SELECT * FROM phonenumbers p WHERE p.isDeleted != 1 AND <p.id> = :id;';
        // $params['id'] = $id;
        // $results = $this->query($query, $params);
        return $results;
    }
    
    public function findKeywordsByPhonenumberId($id){
        $query = 'SELECT id, keyword FROM phonenumberkeywords k WHERE <k.phoneNumberId> = :phoneNumberId;';
        $params['phoneNumberId'] = $id;
        $results = $this->query($query, $params);
        return $results;
    }
    
    public function updateDetails($id = NULL, $countryIsoCode, $displayText, $public, $international){
        if ($id != NULL) {
            
            $query = "UPDATE phonenumbers p 
                      SET 
                        <p.countryIsoCode> = :countryIsoCode,
                        <p.displayText> = :displayText,
                        <p.public> = :public,
                        <p.foreignerCompatible> = :international
                      WHERE <p.id> = :id;";
            $params['id'] = $id;
            $params['countryIsoCode'] = $countryIsoCode;
            $params['displayText'] = $displayText;
            $params['public'] = $public;
            $params['international'] = $international;
            
            $where['id'] = $id;
            $result = $this->update('phonenumbers', $params, $where);
            $result->id;
            var_dump($result);exit();
            //Should return true/false
            // $results = $this->query($query, $params);
            return $id;
        }
    }
}