<?php
require_once __DIR__.'/../base/nova-api.php';

class Users extends NovaAPI {
    function getDeleteUsersOverview() {
        $model = $this->loadModel('users');
        $results = $model->getListFreeUser();
        return json_encode(['content' => $results]);
    }
    
    function getUser() {
        $model = $this->loadModel('users');
        $results = $model->getUserFromId($this->userId);
        return json_encode(['content' => $results]);
    }
    
}