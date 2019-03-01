<?php
require_once __DIR__.'/../base/nova-api.php';

class Users extends NovaAPI {
    public function getDeleteUsersOverview() {
        $model = $this->loadModel('users');
        $results = $model->getListFreeUser();
        return json_encode(['content' => $results]);
    }

    public function getProfileData() {
        $userModel = $this->loadModel('users');
        $accountModel = $this->loadModel('accounts');
        $timezoneModel = $this->loadModel('timezones');
        $countriesModel = $this->loadModel('countries');
        
        $userData = $userModel->getProfileDetailsByUserId($this->userId);
        $accountData = $accountModel->getProfileDetailsById($userData['accountId']);
        $timezones = $timezoneModel->getTimezoneList();
        $countries = $countriesModel->listAll();
        unset($userData['accountId']);

        return json_encode([
            'user' => $userData,
            'account' => $accountData,
            'timezones' => $timezones,
            'countries' => $countries
        ]);
    }

    public function updateSelf(...$fields) {
        $usersModel = $this->loadModel('users');
        $accountsModel = $this->loadModel('accounts');

        [ 
            $firstName, $lastName, $email, $departmentName, $language, $phonenumber, $filename, // User Details
            $country, $postalCode, $city, $address, $university,$timezone, $vatId               // Account Details
        ] = $fields;

        // CDNModel->uploadImage(filename)
        
        $currentUserData = $usersModel->getProfileDetailsByUserId($this->userId);

        $userUpdated = $usersModel->updateProfileDetails(
            $this->userId,
            $firstName,
            $lastName,
            $email,
            $departmentName,
            $language,
            $phonenumber,
            $filename
        );

        $accountUpdated = $accountsModel->updateProfileDetails(
            $currentUserData['accountId'],
            $country,
            $postalCode,
            $city,
            $address,
            $university,
            $timezone,
            $vatId
        );
        if($userUpdated && $accountUpdated) {
            return true;
        }
        throw new Exception();
    }
}