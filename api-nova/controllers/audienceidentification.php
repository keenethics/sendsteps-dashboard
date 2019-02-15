
<?php
require_once __DIR__.'/../base/nova-api.php';

class AudienceIdentification extends NovaAPI {
    
    public function getQuestions() {
        $identificationQuestionModel = $this->loadModel('participantinfofields');
        return json_encode($identificationQuestionModel->getBySessionId($this->getUserSessionId()));
    }

    public function getQuestionOptions($infoFieldId) {
        $identificationOptionModel = $this->loadModel('participantinfofieldsoption');
        return json_encode($identificationOptionModel->getByInfoFieldId($infoFieldId));
    }

    public function createIdentificationQuestion(...$params) {
        $identificationQuestionModel = $this->loadModel('participantinfofields');
        $identificationOptionModel = $this->loadModel('participantinfofieldsoption');

        [ $questionTitle, $type, $isRequired, $participantInfofieldId, $options ] = $params;

        if($participantInfofieldId == NULL) {
            $updatedParticipantInfoFieldId = $identificationQuestionModel->createQuestion(
                $this->getUserSessionId(),
                $questionTitle,
                $type,
                $isRequired
            );
        } 
        else 
        {
            $updatedParticipantInfoFieldId = $identificationQuestionModel->updateQuestion(
                $questionTitle,
                $type,
                $isRequired,
                $participantInfofieldId
            );
        }

        $identificationOptionModel->deleteOptions($updatedParticipantInfoFieldId);
        if(count((array) $options) > 0 && strlen(array_values((array) $options)[0]) > 0) {
            $identificationOptionModel->addOptions($updatedParticipantInfoFieldId, $options);
        }
        return true;
    }

    // public function createSurveyQuestion(...$params) {
    //     $surveyModel = $this->loadModel('surveys');
    //     $surveyQuestionModel = $this->loadModel('surveyquestions');
    //     $surveyQuestionOptionModel = $this->loadModel('surveyquestionoptions');
    //     $surveyQuestionTypesModel = $this->loadModel('surveyquestiontypes');

    //     [ $surveyQuestionName, $surveyTypeId, $isRequired, $surveyId, $surveyQuestionId, $surveyQuestionOptions ] = $params;

    //     if($surveyQuestionId == NULL) {
    //         $updatedSurveyQuestionId = $surveyQuestionModel->createQuestion(
    //             $surveyQuestionName,
    //             $surveyTypeId,
    //             $isRequired,
    //             $surveyId,
    //             $this->getUserSessionId()
    //         );
    //     } 
    //     else 
    //     {
    //         $updatedSurveyQuestionId = $surveyQuestionModel->updateQuestion(
    //             $surveyQuestionId,
    //             $surveyQuestionName,
    //             $surveyTypeId,
    //             $isRequired
    //         );
    //     }

    //     if($updatedSurveyQuestionId) {
            // $surveyQuestionOptionModel->deleteOptions($updatedSurveyQuestionId);
            // if(count((array) $surveyQuestionOptions) > 0 && strlen(array_values((array) $surveyQuestionOptions)[0]) > 0) {
            //     $surveyQuestionOptionModel->addOptions($updatedSurveyQuestionId, $surveyTypeId, $surveyQuestionOptions);
            // }
            // $survey = $surveyQuestionModel->getById($updatedSurveyQuestionId);
            // return json_encode($survey);
    //     }
    //     return false;
    // }

    public function deleteIdentificationQuestion($identificationQuestionId) {
        $identificationQuestionModel = $this->loadModel('participantinfofields');
        $identificationOptionModel = $this->loadModel('participantinfofieldsoption');

        $identificationQuestionModel->deleteQuestion($identificationQuestionId);
        return json_encode(!!$identificationOptionModel->deleteOptions($identificationQuestionId));
    }
}