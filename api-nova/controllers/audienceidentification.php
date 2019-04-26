<?php

require_once __DIR__.'/../base/nova-api.php';



class AudienceIdentification extends NovaAPI {
    
    public function getQuestions() {
        $identificationQuestionModel = $this->loadModel('participantinfofields');
        return json_encode($identificationQuestionModel->getBySessionId($this->getUserSessionId()));
    }

    public function getQuestionOptions(Request $request) {
        $identificationOptionModel = $this->loadModel('participantinfofieldsoption');
        return json_encode($identificationOptionModel->getByInfoFieldId($request->id));
    }

    public function createIdentificationQuestion(Request $request) {
        $identificationQuestionModel = $this->loadModel('participantinfofields');
        $identificationOptionModel = $this->loadModel('participantinfofieldsoption');

        if(!isset($request->questionId)) {
            $updatedParticipantInfoFieldId = $identificationQuestionModel->createQuestion(
                $this->getUserSessionId(),
                $request->question,
                $request->type,
                $request->required,
                $request->order
            );
        } 
        else 
        {
            $updatedParticipantInfoFieldId = $identificationQuestionModel->updateQuestion(
                $request->question,
                $request->type,
                $request->required,
                $request->questionId,
                $request->order
            );
        }
        $identificationOptionModel->deleteOptions($updatedParticipantInfoFieldId);
        if(count((array) $request->identificationQuestionOptions) > 0 && strlen(array_values((array) $request->identificationQuestionOptions)[0]) > 0) {
            $identificationOptionModel->addOptions($updatedParticipantInfoFieldId, $request->identificationQuestionOptions);
        }
        return true;
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