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
        $results['internetaddressoverwrite'] = $sessionResults['internetAddressOverwrite'];
        $results['phonenumber-id'] = $sessionResults['phoneNumberId'];
        //Get Phonenumber
        $phonenumberModel = $this->loadModel('phonenumbers');
        $phonenumberResults = $phonenumberModel->findActiveById($sessionResults['phoneNumberId'])[0];
        $results['phonenumber-countryisocode'] = $phonenumberResults['countryIsoCode'];
        $results['phonenumber-foreignercompatible'] = $phonenumberResults['foreignerCompatible'];
        //Get Responsesites list
        $responsesitesModel = $this->loadModel('responsesites');
        $responsesitesResults = $responsesitesModel->getActiveList();
        $results['responsesites-list'] = $responsesitesResults;
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
        return json_encode(['content' => $results]);
    }
}