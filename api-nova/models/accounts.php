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

    public function updateProfileDetails($requestParams) {

        $update = $this->database()->update(
            'accounts',
            [
                'country' => $requestParams->country,
                'postalCode' => $requestParams->postalCode,
                'city' => $requestParams->city,
                'address' => $requestParams->address,
                'university' => $requestParams->university,
                'timezone' => $requestParams->timezone,
                'vatId' => $requestParams->vatId
            ],
            ['id' => $requestParams->accountId ]
        );
        if($update->execute()) {
            return true;
        }
        return false;
    }
}