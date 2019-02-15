<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Messageupvotes_Model extends Model {

    public function getRecentActivity($sessionId) {
        $upvotedMessageIds = $this->database()->select(
            'messageupvotes',
            'messageId',
            [
                'sessionId' => $sessionId,
                'ORDER' => ["createdAt" => "DESC"],
                'LIMIT' => 100
            ]
        );
        $upvotedMessages = $this->database()->select(
            'livemessageroundmessages',
            '*',
            [
                'id' => $upvotedMessageIds,
                'status[!]' => 'deleted',
                'ORDER' => ["timestamp" => "DESC"],
                'LIMIT' => 10
            ]
        );
 
        return $upvotedMessages;
    }
}