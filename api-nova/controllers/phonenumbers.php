<?php
require_once __DIR__.'/../base/nova-api.php';

class Phonenumbers extends NovaAPI {
    function getOverview(){
        $model = $this->loadModel('phonenumbers');
        $results = $model->findActiveNumbers();
        return json_encode(['content' => $results]);
    }

    function getDetails($params) {
        $id = isset($params[0])? $params[0] : NULL;
        // Fetch data from single phonenumber
        if($id != NULL){
            $model = $this->loadModel('phonenumbers');
            $results = $model->findActiveById($id);
            return json_encode(['content' => $results]);                
        }
        return false;        
    }
}