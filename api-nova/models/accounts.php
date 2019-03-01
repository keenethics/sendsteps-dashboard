<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Accounts_Model extends Model {

    public function getProfileDetailsById($id) {
        return $this->database()->get(
            'accounts',
            [ 
                'timezone',
                'university',
                'address',
                'postalCode',
                'city',
                'country',
                'vatId'
            ],
            [ 'id' => $id ]
        );
    }

    public function updateProfileDetails($id, ...$fields) {

        [ $country, $postalCode, $city, $address, $university,$timezone, $vatId ] = $fields;

        $update = $this->database()->update(
            'accounts',
            [
                'country' => $country,
                'postalCode' => $postalCode,
                'city' => $city,
                'address' => $address,
                'university' => $university,
                'timezone' => $timezone,
                'vatId' => $vatId
            ],
            ['id' => $id ]
        );
        if($update->execute()) {
            return true;
        }
        return false;
    }
}