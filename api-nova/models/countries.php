<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Countries_Model extends Model {
    public function listAll(){
        $results = $this->query('SELECT isoCode, `name` FROM countries');
        return $results;
    }

    public function listAllByPhonenumbers() {
        return $this->query('SELECT DISTINCT(c.isoCode), c.name FROM phonenumbers p join countries c on p.countryIsoCode=c.isoCode WHERE p.isDeleted != 1');
    }


    // public function listAllByPhonenumbers($showInternational = false) {
    //     $phonenumbers = $this->database()->select(
    //         'countries',
    //         [
    //             '[>]phonenumbers' => [
    //                 'isoCode' => 'countryIsoCode'
    //             ]
    //         ],
    //         ['name', 'countryIsoCode'],
    //         [
    //             'isDeleted' => 0,
    //             'foreignerCompatible[!]' => 3
    //         ]
    //     );
    //     return $phonenumbers;
    // }
}