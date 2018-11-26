<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Livemessageroundmessages_Model extends Model {

    const INCOMING = "unread";
    const QUEUE = "read";
    const SCREEN = "showing";
    const APPEARED = "shown";
    const REMOVE = "removed";
    const EDITED = "edited";
    const COPIED = "copied";

    private function sendTo($messageIds, $destination) {
        $update = $this->database()->update(
            "livemessageroundmessages",
            ["status" => $destination],
            ["id" => $messageIds]
        );
        return $update->execute();
    }

    public function addNewMessage($message) {
        $insertedMessageId = $this->insertOn(
            'livemessageroundmessages',
            [
                'connection' => '', // Not null
                'destination' => '', // Not null
                'groupId' => null,
                'messageRoundId' => $message->messageRoundId,
                'participantId' => $message->participantId,
                'sessionId' => $message->sessionId,
                'source' => '', // Binary(40) ?? How to generate
                'starred' => false, // Not null
                'status' => 'unread',
                'text' => $message->text
            ]
        );
        return $this->database()->select(
            "livemessageroundmessages", 
            "*", 
            ["id" => $insertedMessageId]
        )[0];
    }

    public function findById($id){
        $results = $this->findByIdCentral($id, 'livemessageroundmessages');
        return $results[0];
    }

    public function updateGroupId($groupId, $ids) {
        $update = $this->database()->update(
            "livemessageroundmessages", 
            ["groupId" => $groupId],
            ["id" => $ids]
        );
        if($update->execute()) {
            return $groupId;
        }
        return false;
    }

    public function findByMessageRoundId($id) {
        return $this->database()->select(
            "livemessageroundmessages", 
            "*", 
            ["messageRoundId" => $id]
        );
    }

    public function delete($ids) {
        $update = $this->database()->update(
            "livemessageroundmessages",
            ["status" => $this::REMOVE],
            ["id" => $ids]
        );
        return $update->execute();
    }

    public function setStar($id) {
        $result = $this->findById($id);
        // Invert 0 / 1
        $newValue = 1 ^ $result['starred'];
        $update = $this->database()->update(
            "livemessageroundmessages",
            ["starred" => $newValue],
            ["id" => $id]
        );
        return $update->execute();
    }

    public function sendToScreen($messageIds) {
        if($this->sendTo($messageIds, $this::SCREEN)) {
            return $messageIds;
        }
        return false;
    }

    public function sendToQueue($messageIds) {
        if($this->sendTo($messageIds, $this::QUEUE)) {
            return $messageIds;
        }
        return false;
    }

    public function sendToIncoming($messageIds) {
        if($this->sendTo($messageIds, $this::INCOMING)) {
            return $messageIds;
        }
        return false;
    }

    public function sendToAppeared($messageIds) {
        if($this->sendTo($messageIds, $this::APPEARED)) {
            return $messageIds;
        }
        return false;
    }
}