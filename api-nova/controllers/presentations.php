<?php
require_once __DIR__.'/../base/nova-api.php';

class Presentations extends NovaAPI {
    function getOverview(){
        $presentaionModel = $this->loadModel('presentations');
        $sessionId = $this->getUser()['sessionId'];
        $results = $presentaionModel->getOverviewData($sessionId);
        $presentationIds = [];
        foreach($results as $r){
            $presentationIds[] = $r['presentationId'];
        }
        $presentationIds = array_flip(array_flip($presentationIds));
        $numberOfParticipants = $presentaionModel->getNumberOfParticipants($presentationIds);

        foreach ($results as $key => $r){
            $results[$key]['numberOfParticipants'] = $numberOfParticipants[$r['presentationId']];
        }
        return json_encode(['content' => $results]);
    }
    
    function getDetails($id = NULL) {
        // Fetch data from single presentation
        if($id != NULL){
            $model = $this->loadModel('presentations');
            $results = $model->findActiveById($id);
            return json_encode(['content' => $results]);                
        }
        return false;        
    }
}