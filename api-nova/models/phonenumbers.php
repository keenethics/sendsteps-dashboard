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
        $results = $this->findByIdCentral($id, 'phonenumbers', 'isDeleted')[0];
        //Some bright spark chose to use the foreignerCompatible field as a boolean, but uses 1 as false & 2 as true. They also set it to 3, to indicate an inactive number. OMG. 
        // $results['foreignerCompatible'] = ($results['foreignerCompatible'] == 2)? 1 : 0;
        $results['public'] = ($results['public'] == 1)? 1 : 0;
        return $results;
    }
    
    public function findKeywordsByPhonenumberId($id){
        $query = 'SELECT id, keyword FROM phonenumberkeywords k WHERE <k.phoneNumberId> = :phoneNumberId;';
        $params['phoneNumberId'] = $id;
        $results = $this->query($query, $params);
        return $results;
    }
    
    public function updateDetails($table = '', $fields = array(), $id = NULL){
        //Some bright spark chose to use the foreignerCompatible field as a boolean, but uses 1 as false & 2 as true. They also set it to 3, to indicate an inactive number. OMG. 
        $fields['foreignerCompatible'] = ($fields['foreignerCompatible'] == 1)? 1 : 2; 
        $results = $this->insertOn($table, $fields, $id);
        return $results;
    }

    public function getDefault() {
        $defaultIsoCode = 'NL';
        $fields = ['id', 'phonenumber', 'displayText', 'countryIsoCode', 'foreignerCompatible'];
        $results = $this->database()->select(
            'phonenumbers',
            $fields,
            [
                'foreignerCompatible' => [2],
                'countryIsoCode' => $defaultIsoCode,
                'keywordAvailability' => 'dedicated'
            ]
        );
        return $results;
    }

    public function getByIsoCode($isoCode) {
        $fields = ['id', 'phonenumber', 'displayText', 'countryIsoCode', 'foreignerCompatible'];
        $results = $this->database()->select(
            'phonenumbers',
            $fields,
            [
                'foreignerCompatible' => [1,2],
                'countryIsoCode' => $isoCode,
                'keywordAvailability' => 'dedicated'
            ]
        );
        return $results;
    }

    public function getInternationalNumberByIsoCode($countryIsoCode) {
        // SELECT * FROM countries c LEFT JOIN phonenumbers p ON c.isoCode = p.countryIsoCode WHERE p.isDeleted != 1 AND p.foreignerCompatible = 1 ORDER BY name

        $this->database()->select(
            'countries',
            // left join
            [
                '[>]phonenumbers' => [
                    'isoCode' => 'countryIsoCode'
                ]
            ],
            '*',
            [
                'isDeleted[!]' => 1,
                'foreignerCompatible' => 1
            ]
        );
    }
}