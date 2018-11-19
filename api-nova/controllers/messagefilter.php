
<?php
require_once __DIR__.'/../base/nova-api.php';

class MessageFilter extends NovaAPI {

    public function getOverview(){
        $model = $this->loadModel('dashboards');
        $results = $model->getOverview();
        return json_encode(['content' => $results]);     
    }
    
    public function getDetails($id = NULL) {
        // Fetch data from single phonenumber
        if($id != NULL){
            $model = $this->loadModel('dashboards');
            $results = $model->findById($id);
            return json_encode(['content' => $results[0]]);                
        }
        return false;        
    }

    public function selectSlide($messageRoundId) {

    }

    public function toggleUpvoting() {

    }

    public function toggleAutoAccept() {

    }

    public function addNewMessage() {

    }

    public function editMessage($messageId) {

    }

    public function markAsDeleted($messageId) {
        
    }

    public function undoMarkAsDeleted($deletedMessageIds) {

    }

    public function addMessageGroup() {

    }

    public function removeMessageGroup() {

    }

    public function addToMessageGroup() {

    }

    public function sendToQueue($messageIds) {

    }

    public function sendToScreen($messageIds) {

    }

    public function sendToIncoming($messageIds) {

    }

    public function sendToAppeared($messageIds) {

    }

    public function getMessageFilterData() {
        return json_encode(['content' => [
            [
                'id' => 4141,
                'connection' => null,
                'destination' => "-",
                'groupId' => null,
                'messageRoundId' => 5481,
                'participantId' => 534149,
                'sessionId' => 591,
                'source' => "56b51709fb203035011a1e69f7be1ffc71eb012c",
                'starred' => null,
                'upvoteCount' => 10,
                'status' => "unread",
                'text' => "This is the first message with a veryyyyyyyyyyyyyyyyyyy loooooooooooooooooog message"
            ],
            [
                'id' => 827234,
                'connection' => null,
                'destination' => "-",
                'groupId' => null,
                'messageRoundId' => 5481,
                'participantId' => 12341,
                'sessionId' => 591,
                'source' => "56b51709fb203035011a1e69f7be1ffc71eb012c",
                'starred' => null,
                'upvoteCount' => 23,
                'status' => "unread",
                'text' => "This is the second message"
            ],
            [
                'id' => 67151,
                'connection' => null,
                'destination' => "-",
                'groupId' => null,
                'messageRoundId' => 5481,
                'participantId' => 535149,
                'sessionId' => 591,
                'source' => "56b51709fb203035011a1e69f7be1ffc71eb012c",
                'starred' => null,
                'upvoteCount' => 17,
                'status' => "unread",
                'text' => "This is the third message"
            ]
        ]]
        );
    }





}