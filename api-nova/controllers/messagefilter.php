<?php

require_once __DIR__.'/../base/nova-api.php';


class MessageFilter extends NovaApi {

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

    public function toggleUpvoting(Request $request) {
        $model = $this->loadModel('sessions');
        $sessionId = $this->getUserSessionId();
        if($request->isEnabled) {
            $model->toggleAutoAccept(false, $sessionId);
        }
        return json_encode($model->toggleUpvoting($request->isEnabled, $sessionId));
    }

    public function toggleAutoAccept(Request $request) {
        $model = $this->loadModel('sessions');
        $sessionId = $this->getUserSessionId();
        if($request->isEnabled) {
            $model->toggleUpvoting(false, $sessionId);
        }
        return json_encode($model->toggleAutoAccept($request->isEnabled, $sessionId));
    }

    public function addNewMessage(Request $request) {
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->addNewMessage($request->message));
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

    public function addToGroup(Request $request) {
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->updateGroupId($request->groupId, $request->selectedIds));
    }

    public function sendToQueue(Request $request) {
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->sendToQueue($request->ids));
    }

    public function sendToScreen(Request $request) {
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->sendToScreen($request->ids));
    }

    public function sendToIncoming(Request $request) {
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->sendToIncoming($request->ids));
    }

    public function sendToAppeared(Request $request) {
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->sendToAppeared($request->ids));
    }

    public function starMessage(Request $request) {
        $model = $this->loadModel('livemessageroundmessages');
        return json_encode($model->setStar($request->id));
    }

    public function getMessageGroups($userId) {
       
    }

    public function removeGroup(Request $request) {
        $model = $this->loadModel('livemessageroundmessagegroups');
        return json_encode($model->removeGroup($request->userId, $request->groupId));
    }

    public function addMessageGroup(Request $request) {
        $model = $this->loadModel('livemessageroundmessagegroups');
        return json_encode($model->addGroup($request->userId, $request->groupName, $request->groupColor));
    }

    public function getMessageFilterData(Request $request) {

        $messageModel = $this->loadModel('livemessageroundmessages');
        $groupModel = $this->loadModel('livemessageroundmessagegroups');
        $sessionModel = $this->loadModel('sessions');

        $extraDetails = $sessionModel->getSessionById($this->getUserSessionId())[0];
        
        $groupData = $groupModel->getGroupsByUserId($extraDetails['userId']);

        $messages = $messageModel->findByMessageRoundId($request->msgRoundId);

        return json_encode([
            'messages' => $messages,
            'groups' => $groupData,
            'autoAccept' => $extraDetails['autoApprove'],
            'upvoting' => $extraDetails['hasUpvoting']
        ]);

        // Still need these before being able to work with sockets: 
        // return [
        //     // "upvotingEnabled" => $session->hasUpvoting,
        //     "presentations" => $presentations,
        //     "messageRounds" => $messageRounds,
        //     "openMessageRound" => $openMessageRound,
        //     // "messages" => $messageForCurrentMessageRound,
        //     "onScreenMessages" => $onScreenMessages,
        //     // "groups" => $groups,
        //     "lockId" => $modelModeratorlocks->id,
        //     "oldModeratorsClosed" => $oldModeratorsClosed,
        //     "activeSessionRun" => is_object($activeSessionRun) ? $activeSessionRun->id : $activeSessionRun,
        //     // "autoApprove" => $session->autoApprove,
        //     "autoApproveInterval" => $session->autoApproveInterval,
        //     "moderatorSharingToken" => $user->moderatorSharingToken
        // ];
    }
}