<?php
require_once __DIR__.'/../base/nova-api.php';

class Presentations extends NovaAPI {
    function getOverview(){
        $presentaionModel = $this->loadModel('presentations');
        $sessionId = $this->getUser()['sessionId'];
        $results = $presentaionModel->getOverviewData($sessionId);
        $presentationIds = [];
        // var_dump(count($results));exit();
        foreach($results as $r){
            $presentationIds[] = $r['id'];
        }
        $presentationIds = array_flip(array_flip($presentationIds));
        $numberOfParticipants = $presentaionModel->getNumberOfParticipants($presentationIds);

        foreach ($results as $key => $r){
            $results[$key]['numberOfParticipants'] = $numberOfParticipants[$r['id']];
            $parts = explode('\\', $r['name']);
            $results[$key]['name'] = preg_replace('/\\.[^.\\s]{3,4}$/', '', end($parts));
        }
        return json_encode(['content' => $results]);
    }
    
    function getDetails($id = NULL) {
        // Fetch data from single presentation
        if($id != NULL){
            $model = $this->loadModel('presentations');
            $results = $model->findActiveById($id)[0];
            $parts = explode('\\', $results['name']);
            $results['name'] = preg_replace('/\\.[^.\\s]{3,4}$/', '', end($parts));
 
            return json_encode(['content' => $results]);                
        }
        return false;        
    }
}