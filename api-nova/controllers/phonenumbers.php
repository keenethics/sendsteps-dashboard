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
            $results = $model->findActiveById($id);
            // var_dump($results);exit();
            return json_encode(['content' => $results]);                
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
    
    public function updateDetails($id = NULL, $fields = array()){
        // var_dump($fields);exit();
        if ($id != NULL){
            // $modelFields['']
            $modelFields["countryIsoCode"] = (isset($fields->countryIsoCode)? $fields->countryIsoCode : '');
            $modelFields["displayText"] = (isset($fields->displayText)? $fields->displayText : '');
            $modelFields["public"] = (isset($fields->public) && $fields->public == true ? 1 : 0);
            $modelFields["foreignerCompatible"] = (isset($fields->foreignerCompatible) && $fields->foreignerCompatible == true ? 2 : 1);
            
            $model = $this->loadModel('phonenumbers');
            $update_id = $model->updateDetails('phonenumbers', $modelFields, $id);           
            return $update_id;
            // return $this->getDetails($update_id);
        }
        // var_dump($_POST);exit();
    }
}