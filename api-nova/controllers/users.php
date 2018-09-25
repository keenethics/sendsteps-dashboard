<?php
require_once __DIR__.'/../base/nova-api.php';

class Users extends NovaAPI {
    public function getDeleteUsersOverview() {
        $model = $this->loadModel('users');
        $results = $model->getListFreeUser();
        return json_encode(['content' => $results]);
    }
    
    public function getSelf() {
        $model = $this->loadModel('users');
        $results = $model->getProfileFromId($this->userId);
        return json_encode(['content' => $results]);
    }
}