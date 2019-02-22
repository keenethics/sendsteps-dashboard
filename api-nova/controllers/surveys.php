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
        $surveyQuestionTypesModel = $this->loadModel('surveyquestiontypes');
        $types = $surveyQuestionTypesModel->getAllTypes();
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
        $surveyQuestionModel = $this->loadModel('surveyquestions');
        $surveyQuestionOptionModel = $this->loadModel('surveyquestionoptions');
        $surveyQuestionTypesModel = $this->loadModel('surveyquestiontypes');

        [ $surveyQuestionName, $surveyTypeId, $isRequired, $surveyId, $surveyQuestionId, $order, $surveyQuestionOptions ] = $params;

        if($surveyQuestionId == NULL) {
            $updatedSurveyQuestionId = $surveyQuestionModel->createQuestion(
                $surveyQuestionName,
                $surveyTypeId,
                $isRequired,
                $surveyId,
                $order,
                $this->getUserSessionId()
            );
        } 
        else 
        {
            $updatedSurveyQuestionId = $surveyQuestionModel->updateQuestion(
                $surveyQuestionId,
                $surveyQuestionName,
                $surveyTypeId,
                $isRequired,
                $order
            );
        }

        if($updatedSurveyQuestionId) {
            $surveyQuestionOptionModel->deleteOptions($updatedSurveyQuestionId);
            if(count((array) $surveyQuestionOptions) > 0 && strlen(array_values((array) $surveyQuestionOptions)[0]) > 0) {
                $surveyQuestionOptionModel->addOptions($updatedSurveyQuestionId, $surveyTypeId, $surveyQuestionOptions);
            }
            $survey = $surveyQuestionModel->getById($updatedSurveyQuestionId);
            return json_encode($survey);
        }
        return false;
    }

    public function handleTypeAndOptions($updatedSurveyQuestionId, $surveyTypeId, $surveyQuestionOptions) {
    }

    public function deleteSurveyQuestion($surveyQuestionId) {
        $surveyQuestionModel = $this->loadModel('surveyquestions');
        $surveyQuestionOptionModel = $this->loadModel('surveyquestionoptions');

        $surveyQuestionModel->deleteQuestion($surveyQuestionId);
        return json_encode(!!$surveyQuestionOptionModel->deleteOptions($surveyQuestionId));
    }

    public function getQuestions($surveyId) {
        $surveyQuestionModel = $this->loadModel('surveyquestions');
        return json_encode($surveyQuestionModel->getBySurveyId($surveyId));
    }

    public function updateSurveyName($surveyId, $surveyName) {
        $surveyModel = $this->loadModel('surveys');
        if($surveyModel->updateSurveyNameById($surveyId, $surveyName)) {
            return $this->getDetails($surveyId);
        }
    }

    public function getQuestionOptions($surveyQuestionId) {
        $surveyQuestionOptionModel = $this->loadModel('surveyquestionoptions');
        return json_encode($surveyQuestionOptionModel->getByQuestionId($surveyQuestionId));
    }

    private function getUpdateSurveyStatusFields($currentSurvey, $newStatus) {
        $isPaused = $currentSurvey["status"] == "3";
        $fields = [ "status" => $newStatus ];
        ($newStatus == 1 && !$isPaused) && $fields["start_datetime"] = gmdate('Y-m-d H:i:s \G\M\T');
        $newStatus == 2 && $fields["end_datetime"] = gmdate('Y-m-d H:i:s \G\M\T');
        return $fields;
    }

    private function shouldStopOtherSurveys($surveyId, $newStatus) {
        $isPlaying = $newStatus == "1";
        if($isPlaying) {
            $surveyModel = $this->loadModel('surveys');
            $surveyModel->stopAllSurveysBySessionId($this->getUserSessionId());
        }
    }

    public function updateSurveyStatus($surveyId, $newStatus) {
        $surveyModel = $this->loadModel('surveys');
        $currentSurvey = $surveyModel->getActiveById($surveyId)[0];
        $this->shouldStopOtherSurveys($surveyId, $newStatus);
        $fields = $this->getUpdateSurveyStatusFields($currentSurvey, $newStatus);
        if($surveyModel->updateSurveyStatus($surveyId, $fields)) {
            return $this->getOverview();
        }
        return false;
    }

    public function updateOrder($orderIds, $surveyId) {
        $surveyQuestionModel = $this->loadModel('surveyquestions');
        if($surveyQuestionModel->updateOrder($orderIds)) {
            return $this->getQuestions($surveyId);
        }
    }
}