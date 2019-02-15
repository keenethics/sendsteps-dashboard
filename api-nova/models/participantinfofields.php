<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Participantinfofields_Model extends Model {
    
    public function getBySessionId($sessionId) {
        return $this->database()->select(
            'participantinfofields',
            '*',
            [
                'sessionId' => $sessionId,
                'deleted' => 0
            ]
        );
    }

    public function createQuestion($sessionId, ...$params) {

        [ $questionTitle, $type, $isRequired ] = $params;

        $result = $this->insertOn(
            'participantinfofields',
            [
                'title' => $questionTitle,
                'type' => $type,
                'isRequired' => $isRequired,
                'deleted' => 0,
                'sessionId' => $sessionId,
                // Fix order somehow
                'fieldIndex' => 0
            ] 
        );
        return $result;
    }

    public function updateQuestion(...$params) {

        [ $questionTitle, $type, $isRequired, $participantInfofieldId ] = $params;

        $update = $this->database()->update(
            'participantinfofields',
            [
                'title' => $questionTitle,
                'isRequired' => $isRequired,
                'type' => $type,
                // Fix order somehow
                'fieldIndex' => 0
            ],
            [
                'id' => $participantInfofieldId
            ]
        );

        if($update->execute()) {
            return $participantInfofieldId;
        }
        return false;

    }

    public function deleteQuestion($infoFieldId) {
        $result = $this->database()->update(
            'participantinfofields',
            [
                'deleted' => 1
            ],
            [
                'id' => $infoFieldId
            ]
        );
        
        if($result->execute()) {
            return $infoFieldId;
        }
        return false;
    }
}