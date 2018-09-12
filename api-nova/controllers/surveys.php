<?php
require_once __DIR__.'/../base/nova-api.php';

class Surveys extends NovaAPI {
    function getOverview() {
        $surveyModel = $this->loadModel('surveys');
        $sessionId = $this->getUser()['sessionId'];
        // $results = $surveyModel->getOverviewData(400619);
        // var_dump($results);exit();
        $results = $surveyModel->getOverviewData($sessionId);

        return json_encode(['content' => $results]);
    }
    
    function getDetails($id = NULL) {
        // Fetch data from single presentation
        if($id != NULL){
            // $model = $this->loadModel('presentations');
            // $results = $model->findActiveById($id);
            // return json_encode(['content' => $results]);                
        }
        return false;        
    }
}