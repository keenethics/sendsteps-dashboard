<?php
require_once __DIR__.'/../base/nova-api.php';

class Responsesite extends NovaAPI {
    function getSettingsBasic() {
        //Get Session
        $sessionModel = $this->loadModel('sessions');
        $sessionId = $this->getUser()['sessionId'];
        $sessionResults = $sessionModel->getSessionById($sessionId)[0];
        //Get Phonenumber
        $phonenumberModel = $this->loadModel('phonenumbers');
        $phonenumberResults = $phonenumberModel->findActiveById($sessionResults['phoneNumberId'])[0];
        //Populate $results
        $results['textmessagingkeyword'] = $sessionResults['textMessagingKeyword'];
        $results['internetselected'] = $sessionResults['internetSelected'];
        $results['internetaddressoverwrite'] = $sessionResults['internetAddressOverwrite'];
        $results['phonenumber-id'] = $sessionResults['phoneNumberId'];
        $results['phonenumber-countryisocode'] = $phonenumberResults['countryIsoCode'];
        $results['phonenumber-foreignercompatible'] = $phonenumberResults['foreignerCompatible'];
        return json_encode(['content' => $results]);
    }
    function getSettingsLayout() {
        return json_encode(['content' => 'placholder']);
    }
}