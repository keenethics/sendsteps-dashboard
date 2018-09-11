<?php
require_once __DIR__.'/../base/nova-api.php';

class Presentations extends NovaAPI {
    function getOverview(){
        $presentaionModel = $this->loadModel('presentations');
        $sessionId = $this->getUser()['sessionId'];
        $results = $presentaionModel->getOverviewData($sessionId);
        foreach($results as $key=> $r){
            $results[$key]['NumberOfParticipants'] = $model->getNumberOfParticipants($r['presentationId']);
        }
        return json_encode(['content' => $results]);
    }
}