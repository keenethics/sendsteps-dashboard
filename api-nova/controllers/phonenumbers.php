<?php
require_once __DIR__.'/../base/nova-api.php';

class Phonenumbers extends NovaAPI {
    public function getOverview(){
        $model = $this->loadModel('phonenumbers');
        $results = $model->findActiveNumbers();
        return json_encode(['content' => $results]);
    }

    public function getDetails($id = NULL) {
        // Fetch data from single phonenumber
        if($id != NULL){
            $model = $this->loadModel('phonenumbers');
            $results = $model->findActiveById($id)[0];
            $keywords = $model->findKeywordsByPhonenumberId($id);
            return json_encode(['content' => ['phonenumbers' => $results, 'keywords' => $keywords[0]]]);                
        }
        return false;        
    }

    public function getKeywords($phonenumberId = NULL) {
        // Fetch data from single phonenumber
        if($phonenumberId != NULL){
            $model = $this->loadModel('phonenumbers');
            $results = $model->findKeywordsByPhonenumberId($phonenumberId);
            return json_encode(['content' => $results]);                
        }
        return false;        
    }
    
    public function updateDetails($id = NULL){
        var_dump($_POST);exit();
    }
}