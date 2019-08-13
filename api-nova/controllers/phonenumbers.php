<?php

require_once __DIR__.'/../base/nova-api.php';

class Phonenumbers extends NovaAPI {
    public function getOverview(){
        $model = $this->loadModel('phonenumbers');
        $results = $model->findActiveNumbers();
        return json_encode(['content' => $results]);
    }

    public function getDetails(Request $request) {
        // Fetch data from single phonenumber
        if(isset($request->id)){
            $model = $this->loadModel('phonenumbers');
            $results = $model->findActiveById($id);
            // var_dump($results);exit();
            return json_encode(['content' => $results]);                
        }
        return false;        
    }

    public function getNumberByIsoCode(Request $request) {
        $model = $this->loadModel('phonenumbers');
        if($request->isoCode == "--") {
            return json_encode(['content' => $model->getDefault()]);
        }
        else if($request->isoCode != NULL) {
            return json_encode(['content' => $model->getByIsoCode($request->isoCode)]);
        }
        return false;
    }

    public function getKeywords(Request $request) {
        // Fetch data from single phonenumber
        if($phonenumberId != NULL){
            $model = $this->loadModel('phonenumbers');
            $results = $model->findKeywordsByPhonenumberId($request->id);
            return json_encode(['content' => $results]);                
        }
        return false;        
    }
    
    public function updateDetails($id = NULL, $fields = array()){
        if ($id != NULL){
            $modelFields["countryIsoCode"] = (isset($fields->countryIsoCode)? $fields->countryIsoCode : '');
            $modelFields["displayText"] = (isset($fields->displayText)? $fields->displayText : '');
            $modelFields["public"] = (isset($fields->public) && $fields->public == true ? 1 : 0);
            $modelFields["foreignerCompatible"] = (isset($fields->foreignerCompatible) && $fields->foreignerCompatible == true ? 2 : 1);
            
            $model = $this->loadModel('phonenumbers');
            $update_id = $model->updateDetails('phonenumbers', $modelFields, $id);           
            return $update_id;
        }
    }
}