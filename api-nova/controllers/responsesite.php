<?php
require_once __DIR__.'/../base/nova-api.php';

class Responsesite extends NovaAPI {
    public function getSettingsBasic() {
        //Get Session
        $sessionModel = $this->loadModel('sessions');
        $sessionId = $this->getUserSessionId();
        $sessionResults = $sessionModel->getSessionById($sessionId)[0]; 
        $results['textmessagingkeyword'] = $sessionResults['textMessagingKeyword'];
        $results['internetselected'] = $sessionResults['internetSelected'];
        $results['textmessagingselected'] = $sessionResults['textMessagingSelected'];
        $results['internetaddressoverwrite'] = $sessionResults['internetAddressOverwrite'];
        $results['phonenumberId'] = $sessionResults['phoneNumberId'];
        //Get Phonenumber
        $phonenumberModel = $this->loadModel('phonenumbers');
        $phonenumberResults = $phonenumberModel->findActiveById($sessionResults['phoneNumberId']);
        $results['phonenumberCountryisocode'] = $phonenumberResults['countryIsoCode'];
        $countriesModel = $this->loadModel('countries');
        $countriesResults = $countriesModel->listAll();
        $results['countriesList'] = $countriesResults;
        $results['phonenumberForeignerCompatible'] = $phonenumberResults['foreignerCompatible'];
        //Get Responsesites list
        $responsesitesModel = $this->loadModel('responsesites');
        $responsesitesResults = $responsesitesModel->getActiveList();
        $results['responseSitesList'] = $responsesitesResults;
        return json_encode(['content' => $results]);
    }
    
    public function getSiteList() {
        $responsesitesModel = $this->loadModel('responsesites');
        $results = $responsesitesModel->getActiveList();
        return json_encode(['content' => $results]);
    }
    
    public function getSiteById($id) {
        $responsesitesModel = $this->loadModel('responsesites');
        $results = $responsesitesModel->getActiveById($id);
        return json_encode(['content' => $results[0]]);
    }
    
    public function updateSettingsBasic($fields = array()){
        var_dump($fields);exit();
        if (count($fields) > 0){
        
            // var_dump($fields);exit();
        
            $sessionModel = $this->loadModel('sessions');
            $sessionId = $this->getUserSessionId();
            $sessionResults = $sessionModel->getSessionById($sessionId)[0]; 
        
        
            // $modelFields["countryIsoCode"] = (isset($fields->countryIsoCode)? $fields->countryIsoCode : '');
            // $modelFields["displayText"] = (isset($fields->displayText)? $fields->displayText : '');
            // $modelFields["public"] = (isset($fields->public) && $fields->public == true ? 1 : 0);
            // $modelFields["foreignerCompatible"] = (isset($fields->foreignerCompatible) && $fields->foreignerCompatible == true ? 2 : 1);
            
            // $model = $this->loadModel('phonenumbers');
            // $update_id = $model->updateDetails('phonenumbers', $modelFields, $id);           
            // return $update_id;
        }
    }
}