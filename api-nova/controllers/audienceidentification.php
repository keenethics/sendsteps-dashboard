<?php

require_once __DIR__.'/../base/nova-api.php';



class AudienceIdentification extends NovaAPI {
    
    public function getQuestions() {
        $identificationQuestionModel = $this->loadModel('participantinfofields');
        $identificationQuestions = $identificationQuestionModel->getBySessionId($this->getUserSessionId());
        foreach($identificationQuestions as $key => $question) {
            $identificationQuestions[$key]['options'] = $this->getQuestionOptions($question['id']);
        }
        return json_encode($identificationQuestions);
    }

    public function getQuestionOptions($questionId) {
        $identificationOptionModel = $this->loadModel('participantinfofieldsoption');
        return $identificationOptionModel->getByInfoFieldId($questionId);
    }

    public function createIdentificationQuestion(Request $request) {
        $identificationQuestionModel = $this->loadModel('participantinfofields');
        $identificationOptionModel = $this->loadModel('participantinfofieldsoption');

        if(!isset($request->question->id)) {
            $updatedParticipantInfoFieldId = $identificationQuestionModel->createQuestion(
                $this->getUserSessionId(),
                $request->question
            );
        } 
        else 
        {
            $updatedParticipantInfoFieldId = $identificationQuestionModel->updateQuestion(
                $request->question
            );
        }
        $identificationOptionModel->deleteOptions($updatedParticipantInfoFieldId);
        if(count((array) $request->question->options) > 0 && strlen(array_values((array) $request->question->options)[0]) > 0) {
            $identificationOptionModel->addOptions($updatedParticipantInfoFieldId, $request->question->options);
        }
        return $this->getQuestions();
    }

    public function updateOrder(Request $request) {
        $identificationQuestionModel = $this->loadModel('participantinfofields');
        if($identificationQuestionModel->updateOrder($request->idPositions, $this->getUserSessionId())) {
            return $this->getQuestions();
        }
    }

    public function deleteIdentificationQuestion(Request $request) {
        $identificationQuestionModel = $this->loadModel('participantinfofields');
        $identificationOptionModel = $this->loadModel('participantinfofieldsoption');

        $identificationQuestionModel->deleteQuestion($request->id);
        return json_encode(!!$identificationOptionModel->deleteOptions($request->id));
    }
}