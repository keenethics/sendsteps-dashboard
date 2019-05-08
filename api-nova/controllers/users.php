<?php

require_once __DIR__.'/../base/nova-api.php';
require_once __DIR__.'/../controllers/upload.php';
require_once __DIR__."/../../api-common/request.php";

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

    public function updateSelf(Request $request) {

        $usersModel = $this->loadModel('users');
        $accountsModel = $this->loadModel('accounts');

        $currentUserData = $usersModel->getProfileDetailsByUserId($this->userId);
        $fileUrl = $currentUserData['filename'];
        if(isset($request->base64String)) {
            $upload = new Upload();
            $fileUrl = $upload->saveFile($request->base64String);
        } 

        $userUpdated = $usersModel->updateProfileDetails(
            $this->userId,
            $request->firstName,
            $request->lastName,
            $request->email,
            $request->departmentName,
            $request->language,
            $request->phonenumber,
            $fileUrl
        );

        $accountUpdated = $accountsModel->updateProfileDetails(
            $currentUserData['accountId'],
            $request->country,
            $request->postalCode,
            $request->city,
            $request->address,
            $request->university,
            $request->timezone,
            $request->vatId
        );
        if($userUpdated && $accountUpdated) {
            return json_encode($fileUrl);
        }
    }
}