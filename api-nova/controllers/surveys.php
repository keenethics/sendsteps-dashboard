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

    public function addSurvey($surveyName) {
        $surveyModel = $this->loadModel('surveys');
        return json_encode(['content' => $surveyModel->addSurvey($surveyName, $this->getUserSessionId())]);
    }

    public function deleteSurvey($surveyId) {
        $surveyModel = $this->loadModel('surveys');
        return json_encode($surveyModel->deleteSurvey($surveyId, $this->getUserSessionId()));
    }

    public function getQuestionTypes() {
        $surveyModel = $this->loadModel('surveys');
        $types = $surveyModel->getQuestionTypes();

        if($types) {
            $assocGroups = array();
            foreach($types as $type) {
                $assocGroups[$type['survey_question_type_id']] = ["question_type" => $type['question_type']]; 
            }
            return json_encode($assocGroups);
        }
        return false;
    }

    public function createSurveyQuestion(...$params) {
        $surveyModel = $this->loadModel('surveys');
        [ $surveyQuestionName, $surveyTypeId, $isRequired, $surveyId ] = $params;

        // If surveyQuestionId wasn't passed
        if(empty($params[4])) {
            $surveyQuestionId = $surveyModel->createSurveyQuestion(
                $surveyQuestionName,
                $surveyTypeId,
                $isRequired,
                $surveyId,
                $this->getUserSessionId()
            );
        } 
        else 
        {
            $surveyQuestionId = $surveyModel->updateSurveyQuestion(
                $params[4],
                $surveyQuestionName,
                $surveyTypeId,
                $isRequired
            );
        }

        if($surveyQuestionId) {
            $survey = $surveyModel->getQuestionById($surveyQuestionId);
            return json_encode($survey);
        }
        return false;
    }

    public function deleteSurveyQuestion($surveyQuestionId) {
        $surveyModel = $this->loadModel('surveys');
        return json_encode($surveyModel->deleteSurveyQuestion($surveyQuestionId));
    }

    public function getQuestions($surveyId) {
        $surveyModel = $this->loadModel('surveys');
        return json_encode($surveyModel->getQuestionsBySurveyId($surveyId));
    }

    public function updateSurveyName($surveyId, $surveyName) {
        $surveyModel = $this->loadModel('surveys');
        if($surveyModel->updateSurveyNameById($surveyId, $surveyName)) {
            return $this->getDetails($surveyId);
        }
    }
}