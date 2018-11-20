
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

    public function deleteMessages($messageIds) {
        $model = $this->loadModel('livemessageroundmessages');
        return $model->delete($messageIds);
    }

    public function addToGroup($groupId = null, $messageIds) {
        $model = $this->loadModel('livemessageroundmessages');
        return $model->updateGroupId($groupId, $messageIds);
    }

    public function sendToQueue($messageIds) {
        $model = $this->loadModel('livemessageroundmessages');
        return $model->sendToQueue($messageIds);
    }

    public function sendToScreen($messageIds) {
        $model = $this->loadModel('livemessageroundmessages');
        return $model->sendToScreen($messageIds);
    }

    public function sendToIncoming($messageIds) {
        $model = $this->loadModel('livemessageroundmessages');
        return $model->sendToIncoming($messageIds);
    }

    public function sendToAppeared($messageIds) {
        $model = $this->loadModel('livemessageroundmessages');
        return $model->sendToAppeared($messageIds);
    }

    public function starMessage($messageId) {
        $model = $this->loadModel('livemessageroundmessages');
        if($messageId) {
            return $model->setStar($messageId);
        }
    }

    public function getMessageGroups($userId) {
        $model = $this->loadModel('livemessageroundmessagegroups');
        return json_encode(['content' => $model->getGroupsByUserId($userId)]);
    }

    public function getMessageFilterData($messageRoundId) {
        $model = $this->loadModel('livemessageroundmessages');
        $results = $model->findByMessageRoundId($messageRoundId);
        return json_encode(['content' => $results]);
    }
}