<?php
require_once __DIR__.'/../base/nova-api.php';

class Sessions extends NovaAPI {
    public function getOverview(){
        $model = $this->loadModel('sessions');
        $results = $model->getOverview();
        // var_dump($results);exit();
        return json_encode(['content' => $results]);
    }

    public function getDetails($id = NULL) {
        // Fetch data from single phonenumber
        if($id != NULL){
            $model = $this->loadModel('phonenumbers');
            $results = $model->findActiveById($id);
            $keywords = $model->findKeywordsByPhonenumberId($phonenumberId);
            return json_encode(['content' => $results, 'keywords' => $keywords]);                
        }
        return false;        
    }
}