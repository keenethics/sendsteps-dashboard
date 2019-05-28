<?php

require_once __DIR__.'/../base/nova-api.php';

class Surveys extends NovaAPI {

    public function getOverview() {
        $surveyModel = $this->loadModel('surveys');
        $tabStatusModel = $this->loadModel('tabstatus');
        $sessionId = $this->getUserSessionId();
        $results = $surveyModel->getOverviewData($sessionId);
        $surveyStatus = $tabStatusModel->getSurveyTabBySessionId($sessionId);
        $surveyUrl = $this->getSurveyUrl();

        return json_encode([
            'content' => $results,
            'url' => $surveyUrl,
            'status' => $surveyStatus['status']
        ]);
    }
    
    public function getDetails(Request $request) {
        // Fetch data from single presentation
        if(isset($request->id)){
            $surveyModel = $this->loadModel('surveys');
            $results = $surveyModel->getActiveById($request->id);
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
    
    public function getResultsDetails(Request $request) {
        // Fetch data from single presentation
        if(isset($request->id)){
            // $model = $this->loadModel('presentations');
            // $results = $model->findActiveById($id);
            // return json_encode(['content' => $results]);                
        }
        return false;        
    }

    public function addSurvey(Request $request) {
        $surveyModel = $this->loadModel('surveys');
        return json_encode(['content' => $surveyModel->addSurvey($request->name, $this->getUserSessionId())]);
    }

    public function deleteSurvey(Request $request) {
        $surveyModel = $this->loadModel('surveys');
        return json_encode($surveyModel->deleteSurvey($request->id, $this->getUserSessionId()));
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

    public function createSurveyQuestion(Request $request) {
        $surveyModel = $this->loadModel('surveys');
        $surveyQuestionModel = $this->loadModel('surveyquestions');
        $surveyQuestionOptionModel = $this->loadModel('surveyquestionoptions');
        $surveyQuestionTypesModel = $this->loadModel('surveyquestiontypes');
        if(!isset($request->question->survey_question_id)) {
            $updatedSurveyQuestionId = $surveyQuestionModel->createQuestion(
                $request->question,
                $this->getUserSessionId()
            );
        } 
        else 
        {
            $updatedSurveyQuestionId = $surveyQuestionModel->updateQuestion(
                $request->question
            );
        }
        if($updatedSurveyQuestionId) {
            $surveyQuestionOptionModel->deleteOptions($updatedSurveyQuestionId);
            if(!!count((array) $request->question->options) && strlen(array_values((array) $request->question->options)[0]) > 0) {
                $surveyQuestionOptionModel->addOptions($updatedSurveyQuestionId, $request->question->survey_question_type_id, $request->question->options);
            }
            $survey = $surveyQuestionModel->getById($updatedSurveyQuestionId);
            $request->id = $request->question->survey_id;
            return $this->getQuestions($request);
        }
        return false;
    }

    public function handleTypeAndOptions($updatedSurveyQuestionId, $surveyTypeId, $surveyQuestionOptions) {
    }

    public function deleteSurveyQuestion(Request $request) {
        $surveyQuestionModel = $this->loadModel('surveyquestions');
        $surveyQuestionOptionModel = $this->loadModel('surveyquestionoptions');
        $surveyQuestionModel->deleteQuestion($request->id);
        return json_encode(!!$surveyQuestionOptionModel->deleteOptions($request->id));
    }

    public function getQuestions(Request $request) {
        $surveyQuestionModel = $this->loadModel('surveyquestions');
        $surveyQuestions = $surveyQuestionModel->getBySurveyId($request->id);
        foreach($surveyQuestions as $key => $question) {
            $surveyQuestions[$key]['options'] = $this->getQuestionOptions($question['survey_question_id']);
        }
        return json_encode($surveyQuestions);
    }

    public function updateSurveyName(Request $request) {
        $surveyModel = $this->loadModel('surveys');
        if($surveyModel->updateSurveyNameById($request->id, $request->surveyName)) {
            return $this->getDetails($request);
        }
    }

    public function getQuestionOptions($questionId) {
        $surveyQuestionOptionModel = $this->loadModel('surveyquestionoptions');
        return $surveyQuestionOptionModel->getByQuestionId($questionId);
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

    public function updateSurveyStatus(Request $request) {
        $surveyModel = $this->loadModel('surveys');
        $currentSurvey = $surveyModel->getActiveById($request->surveyId)[0];
        $this->shouldStopOtherSurveys($request->surveyId, $request->status);
        $fields = $this->getUpdateSurveyStatusFields($currentSurvey, $request->status);
        if($surveyModel->updateSurveyStatus($request->surveyId, $fields)) {
            return $this->getOverview();
        }
        return false;
    }

    public function updateOrder(Request $request) {
        $surveyQuestionModel = $this->loadModel('surveyquestions');
        if($surveyQuestionModel->updateOrder($request->idPositions)) {
            $request->id = $request->surveyId;
            return $this->getQuestions($request);
        }
    }

    public function getSurveyUrl() {
        
        $sessionModel = $this->loadModel('sessions');
        $addinSettingsModel = $this->loadModel('addinsettings');

        $session = $sessionModel->getSessionById($this->getUserSessionId())[0];
        $url = $session['internetAddressOverwrite'];
        if($url === NULL || strlen($url) === 0) {
            $addinSettings = $addinSettingsModel->getWebsiteAddressById($session['pluginId']);
            $url = $addinSettings['websiteAddress'];
        }
        return 'https://' . $url . '/' . $session['textMessagingKeyword'] . '/survey';
    }
}