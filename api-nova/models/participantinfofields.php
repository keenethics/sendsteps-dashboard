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

        [ $questionTitle, $type, $isRequired, $order ] = $params;

        $result = $this->insertOn(
            'participantinfofields',
            [
                'title' => $questionTitle,
                'type' => $type,
                'isRequired' => $isRequired,
                'deleted' => 0,
                'sessionId' => $sessionId,
                'fieldIndex' => $order
            ] 
        );
        return $result;
    }

    public function updateQuestion(...$params) {

        [ $questionTitle, $type, $isRequired, $participantInfofieldId, $order ] = $params;

        $update = $this->database()->update(
            'participantinfofields',
            [
                'title' => $questionTitle,
                'isRequired' => $isRequired,
                'type' => $type,
                'fieldIndex' => $order
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