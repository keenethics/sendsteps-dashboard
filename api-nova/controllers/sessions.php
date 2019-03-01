<?php
require_once __DIR__.'/../base/nova-api.php';

class Sessions extends NovaAPI {
    public function getOverview(){
        $this->isSuperAdmin();
        $model = $this->loadModel('sessions');
        $results = $model->getOverview();
        // var_dump($results);exit();
        return json_encode(['content' => $results]);
    }

    public function getDetails($id = NULL) {
        // Fetch data from single phonenumber
        if($id != NULL){
            $this->isSuperAdmin();
            $sessionId = (int) $id;
            $model = $this->loadModel('sessions');
            $results = $model->getDetails($sessionId);
            return json_encode(['content' => $results]);                
        }
        return false;        
    }

    public function getIdentificationType() {
        $model = $this->loadModel('sessions');
        return json_encode($model->getIdentificationType($this->getUserSessionId())[0]);
    }
    
    public function loginAsUser($sessionId = NULL){
        if($sessionId != NULL){
            $this->isSuperAdmin();
            $usersModel = $this->loadModel('users');
            $sessionsModel = $this->loadModel('sessions');
            $newUserId = (int) $sessionsModel->getUserIdFromSessionId($sessionId);
            $usersModel->setUserIdOfToken($this->userToken, $newUserId);
            return true;
        }
        return false;       
    }

    public function setIdentificationType($isAnonymous) {
        $model = $this->loadModel('sessions');
        return json_encode($model->setIdentificationType($isAnonymous, $this->getUserSessionId()));
    }
}