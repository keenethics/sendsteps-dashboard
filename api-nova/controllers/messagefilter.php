
<?php

require_once __DIR__.'/../base/nova-api.php';
require_once __DIR__.'/../emitter/emitter.php';


class MessageFilter extends NovaApi {

    private $emitter;

    public function __construct() {
        $this->emitter = new Emitter();
    }

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
        
        // SELECT * FROM sessions JOIN  WHERE sessions.running = 1 LIMIT 1
    }

    public function selectSlide($messageRoundId) {

    }

    public function toggleUpvoting($isEnabled) {
        $model = $this->loadModel('sessions');
        $sessionId = $this->getUserSessionId();
        if($isEnabled) {
            $model->toggleAutoAccept(false, $sessionId);
        }
        return json_encode($model->toggleUpvoting($isEnabled, $sessionId));
    }

    public function toggleAutoAccept($isEnabled) {
        $model = $this->loadModel('sessions');
        $sessionId = $this->getUserSessionId();
        if($isEnabled) {
            $model->toggleUpvoting(false, $sessionId);
        }
        return json_encode($model->toggleAutoAccept($isEnabled, $sessionId));
    }

    public function addNewMessage($message) {
        // $this->emitter->emit('message:updated', ['sessionId' => $this->getUserSessionId()]);
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->addNewMessage($message));
    }

    public function editMessage($messageId) {

    }

    public function markAsDeleted($messageId) {
        
    }

    public function undoMarkAsDeleted($deletedMessageIds) {

    }

    public function deleteMessages($messageIds) {
        // $this->emitter->emit('message:updated', ['sessionId' => $this->getUserSessionId()]);
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->delete($messageIds));
    }

    public function addToGroup($groupId, $messageIds) {
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->updateGroupId($groupId, $messageIds));
    }

    public function sendToQueue($messageIds) {
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->sendToQueue($messageIds));
    }

    public function sendToScreen($messageIds) {
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->sendToScreen($messageIds));
    }

    public function sendToIncoming($messageIds) {
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->sendToIncoming($messageIds));
    }

    public function sendToAppeared($messageIds) {
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->sendToAppeared($messageIds));
    }

    public function starMessage($messageId) {
        // $this->emitter->emit('message:updated', ['sessionId' => $this->getUserSessionId()]);
        
        $model = $this->loadModel('livemessageroundmessages');
        $this->emitter->emit('message:updated', ['sessionId' => $this->getUserSessionId()]);
        return json_encode($model->setStar($messageId));
    }

    public function getMessageGroups($userId) {
       
    }

    public function removeGroup($userId, $groupId) {
        // $this->emitter->emit('groups:updated', ['sessionId' => $this->getUserSessionId()]);
        $model = $this->loadModel('livemessageroundmessagegroups');
        return json_encode($model->removeGroup($userId, $groupId));
    }

    public function addMessageGroup($userId, $groupName, $color) {
        // $this->emitter->emit('groups:updated', ['sessionId' => $this->getUserSessionId()]);

        $model = $this->loadModel('livemessageroundmessagegroups');
        return json_encode($model->addGroup($userId, $groupName, $color));
    }

    public function getMessageFilterData($messageRoundId) {
        // $this->emitter->emit("session:subscribe", ['sessionId' => $this->getUserSessionId(), 'socketId' => $socketId]);

        $messageModel = $this->loadModel('livemessageroundmessages');
        $groupModel = $this->loadModel('livemessageroundmessagegroups');
        $sessionModel = $this->loadModel('sessions');

        $extraDetails = $sessionModel->getSessionById($this->getUserSessionId())[0];
        
        $groupData = $groupModel->getGroupsByUserId($extraDetails['userId']);

        $messages = $messageModel->findByMessageRoundId($messageRoundId);

        return json_encode([
            'messages' => $messages,
            'groups' => $groupData,
            'autoAccept' => $extraDetails['autoApprove'],
            'upvoting' => $extraDetails['hasUpvoting']
        ]);
    }
}