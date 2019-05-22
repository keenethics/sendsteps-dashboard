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

        // Initialize models
        $onscreenmessageModel = $this->loadModel('onscreenmessages');
        $presentationsModel = $this->loadModel('presentations');
        $messageroundsModel = $this->loadModel('messagerounds');
        $sessionrunsModel = $this->loadModel('sessionruns');
        $groupModel = $this->loadModel('livemessageroundmessagegroups');
        $votesModel = $this->loadModel('votes');
        $messageModel = $this->loadModel('livemessageroundmessages');
        $sessionModel = $this->loadModel('sessions');


        $sessionId = $this->getUserSessionId();
        $session = $sessionModel->getSessionById($sessionId)[0];

        $presentations = $presentationsModel->getActiveBySessionId($sessionId); 

        $presentationIds = [];
        foreach($presentations as $presentation) {
            $presentationIds[] = $presentation['id'];
        }

        $messagerounds = $messageroundsModel->getActiveByPresentationIdsAndSessionId($presentationIds, $sessionId);
        $votes = $votesModel->getActiveByPresentationIdsAndSessionId($presentationIds, $sessionId);
        $presentations = $presentationsModel->updateOpenedStatus($presentations, $messagerounds, $votes);
        $presentations = $presentationsModel->getOpened($presentations);

        $openMessageRound = null;
        foreach($messagerounds as $messageround) {
            if($messageround['opened'] === 1) {
                $openMessageRound = $messageRound;
                break;
            }
        }

        $messagesForCurrentMessageRound = [];
        $onScreenMessages = [];
        if($openMessageRound) {
            $messagesForCurrentMessageRound = $messageModel->findByMessageroundId($openMessageRound['id']);
            $onScreenMessages = $onscreenmessageModel->getByMessageroundId($openMessageRound['id']);
        }

        $activeSessionRun = $sessionrunsModel->getOpenedBySessionId($sessionId);
        $groupData = $groupModel->getGroupsByUserId($session['userId']);
        $messages = $messageModel->findByMessageRoundId($request->msgRoundId);

        return json_encode([
            'messages' => $messagesForCurrentMessageRound,
            'onScreenMessages' => $onScreenMessages,
            'groups' => $groupData,
            'autoAccept' => $session['autoApprove'],
            'upvoting' => $session['hasUpvoting'],
            'activeSessionRun' => $activeSessionRun,
            'presentations' => $presentations,
            'messageRounds' => $messagerounds,
            'openMessageRound' => $openMessageRound
        ]);

        // Still need these
        // return [
        //     "lockId" => $modelModeratorlocks->id,
        //     "oldModeratorsClosed" => $oldModeratorsClosed,
        //     "autoApproveInterval" => $session->autoApproveInterval,
        //     "moderatorSharingToken" => $user->moderatorSharingToken
        // ];
    }
}