<?php

require_once __DIR__.'/../base/nova-api.php';

class Translations extends NovaAPI {
    public function getOverview(){
        $model = $this->loadModel('translations');
        $results = $model->findTranslations();
        $tmpResults = $returnedResults = array();
        foreach ($results as $row){
            $tmpResults[$row['key']][$row['language']] = $row['text'];
            $tmpResults[$row['key']]['keyId'] = $row['keyId'];
        }
        foreach ($tmpResults as $key => $row){
            $row['key'] = $key;
            $returnedResults[] = $row;
        }
        
        return json_encode(['content' => $returnedResults]);
        // return json_encode(['content' => $results]);
    }

    public function getDetails(Request $request) {
        // Fetch data from single phonenumber
        if(isset($request->id)){
            $model = $this->loadModel('translations');
            $results = $model->findActiveById($request->id);
            return json_encode(['content' => $results]);                
        }
        return false;        
    }
    
    public function getTranslations($userLanguage = '', $userFallback = 'english') {
        if ($userLanguage != ''){
            $model = $this->loadModel('translations');
            $results = $model->findTranslations(array($userLanguage, $userFallback));
            return json_encode(['content' => $results]);    
        }
        return false;
        
    }
}