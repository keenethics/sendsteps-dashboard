
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

        [ $questionTitle, $type, $isRequired, $participantInfofieldId, $order, $options ] = $params;

        if($participantInfofieldId == NULL) {
            $updatedParticipantInfoFieldId = $identificationQuestionModel->createQuestion(
                $this->getUserSessionId(),
                $questionTitle,
                $type,
                $isRequired,
                $order
            );
        } 
        else 
        {
            $updatedParticipantInfoFieldId = $identificationQuestionModel->updateQuestion(
                $questionTitle,
                $type,
                $isRequired,
                $participantInfofieldId,
                $order
            );
        }

        $identificationOptionModel->deleteOptions($updatedParticipantInfoFieldId);
        if(count((array) $options) > 0 && strlen(array_values((array) $options)[0]) > 0) {
            $identificationOptionModel->addOptions($updatedParticipantInfoFieldId, $options);
        }
        return true;
    }

    public function updateOrder($orderIds) {
        $identificationQuestionModel = $this->loadModel('participantinfofields');
        if($identificationQuestionModel->updateOrder($orderIds, $this->getUserSessionId())) {
            return $this->getQuestions();
        }
    }

    public function deleteIdentificationQuestion($identificationQuestionId) {
        $identificationQuestionModel = $this->loadModel('participantinfofields');
        $identificationOptionModel = $this->loadModel('participantinfofieldsoption');

        $identificationQuestionModel->deleteQuestion($identificationQuestionId);
        return json_encode(!!$identificationOptionModel->deleteOptions($identificationQuestionId));
    }
}