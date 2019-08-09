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

    public function createQuestion($sessionId, $question) {
        $result = $this->insertOn(
            'participantinfofields',
            [
                'title' => $question->title,
                'type' => $question->type,
                'isRequired' => $question->isRequired,
                'deleted' => 0,
                'sessionId' => $sessionId,
                'fieldIndex' => $question->fieldIndex
            ] 
        );
        return $result;
    }

    public function updateQuestion($question) {
        $update = $this->database()->update(
            'participantinfofields',
            [
                'title' => $question->title,
                'isRequired' => $question->isRequired,
                'type' => $question->type,
                'fieldIndex' => $question->fieldIndex
            ],
            [
                'id' => $question->id
            ]
        );

        if($update->execute()) {
            return $question->id;
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

    public function updateOrder($orderIds, $sessionId) {
        for($counter = 0; $counter < count($orderIds); $counter++) {
            $result = $this->database()->update(
                'participantinfofields',
                [ 'fieldIndex' => $counter + 1 ],
                [ 'id' => $orderIds[$counter] ]
            );
            if(!$result->execute()) {
                return false;
            }
        }
        return true;
    }
}