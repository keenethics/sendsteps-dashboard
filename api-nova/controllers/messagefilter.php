
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
        
        // SELECT * FROM sessions JOIN  WHERE sessions.running = 1 LIMIT 1
    }

    public function selectSlide($messageRoundId) {

    }

    public function toggleUpvoting() {

    }

    public function toggleAutoAccept($isEnabled) {
        $model = $this->loadModel('sessions');
        // Toggle auto accept triggers counter
        // Counter starts with (20, 10, 5, 3)
        // Counter based on unix timestamp
        // Calculate time left on frontend, 
        // Frontend sends signal to backend when time is over
        // Backend checks if time is actually over
        // Send first queuemessage to screen

        // What if dashboard is closed?
        // What if multiple dashboards are open?
    }

    public function addNewMessage($message) {
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
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->setStar($messageId));
    }

    public function getMessageGroups($userId) {
        $model = $this->loadModel('livemessageroundmessagegroups');
        return json_encode(['content' => $model->getGroupsByUserId($userId)]);
    }

    public function removeGroup($userId, $groupId) {
        $model = $this->loadModel('livemessageroundmessagegroups');
        return json_encode($model->removeGroup($userId, $groupId));
    }

    public function addMessageGroup($userId, $groupName, $color) {
        $model = $this->loadModel('livemessageroundmessagegroups');
        return json_encode($model->addGroup($userId, $groupName, $color));
    }

    public function getMessageFilterData($messageRoundId) {
        $model = $this->loadModel('livemessageroundmessages');
        $results = $model->findByMessageRoundId($messageRoundId);
        return json_encode(['content' => $results]);
    }
}