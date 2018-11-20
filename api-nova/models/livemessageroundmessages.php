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

    public function findById($id){
        $results = $this->findByIdCentral($id, 'livemessageroundmessages');
        return $results[0];
    }

    public function updateGroupId($groupId, $ids) {
        return $this->database()->update(
            "livemessageroundmessages", 
            ["groupId" => $groupId],
            ["id" => $ids]
        )->execute();
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
    
    public function sendTo($messageIds, $destination) {
        $update = $this->database()->update(
            "livemessageroundmessages",
            ["status" => $destination],
            ["id" => $messageIds]
        );
        return $update->execute();
    }

    public function sendToScreen($messageIds) {
        return $this->sendTo($messageIds, $this::SCREEN);
    }

    public function sendToQueue($messageIds) {
        return $this->sendTo($messageIds, $this::QUEUE);
    }

    public function sendToIncoming($messageIds) {
        return $this->sendTo($messageIds, $this::INCOMING);
    }

    public function sendToAppeared($messageIds) {
        return $this->sendTo($messageIds, $this::APPEARED);
    }
}