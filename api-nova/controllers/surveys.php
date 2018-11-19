<?php
require_once __DIR__.'/../base/nova-api.php';

class Surveys extends NovaAPI {
    public function getOverview() {
        $surveyModel = $this->loadModel('surveys');
        $sessionId = $this->getUserSessionId();
        $results = $surveyModel->getOverviewData($sessionId);

        return json_encode(['content' => $results]);
        
    }
    
    public function getDetails($id = NULL) {
        // Fetch data from single presentation
        if($id != NULL){
            $surveyModel = $this->loadModel('surveys');
            $results = $surveyModel->getActiveById($id);
    
            return json_encode(['content' => $results[0]]);           
        }
        return false;        
    }
    
    public function getResultsOverview() {
        $surveyModel = $this->loadModel('surveys');
        $sessionId = $this->getUserSessionId();
        $results = $surveyModel->getResultsOverviewData($sessionId);

        return json_encode(['content' => $results]);
    }
    
    public function getResultsDetails($id = NULL) {
        // Fetch data from single presentation
        if($id != NULL){
            // $model = $this->loadModel('presentations');
            // $results = $model->findActiveById($id);
            // return json_encode(['content' => $results]);                
        }
        return false;        
    }
}