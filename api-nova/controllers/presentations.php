<?php
require_once __DIR__.'/../base/nova-api.php';

class Presentations extends NovaAPI {
    function getOverview(){
        $presentaionModel = $this->loadModel('presentations');
        $sessionId = $this->getUser()['sessionId'];
        $results = $presentaionModel->getOverviewData($sessionId);
        $presentationIds = [];
        foreach($results as $key => $r){
            $presentationIds[] = $r['presentationId'];
            $results[$key]['numberOfParticipants'] = 1;
        }
        
        // foreach($results as $key => $r){
        //     $results[$key]['NumberOfParticipants'] = $presentaionModel->getNumberOfParticipants($presentationIds);
        // }
        return json_encode(['content' => $results]);
    }
}