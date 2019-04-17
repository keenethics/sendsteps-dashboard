<?php
require_once __DIR__.'/../base/nova-api.php';

class Statistics extends NovaAPI {
    public function getSuperadmin() {
        $model = $this->loadModel('statistics');
        $results = $model->findDataForEmailLike('frieslandcampina.com');
        return json_encode(['content' => $results]);
    }
    
    public function getHomepage() {
        $sessionModel = $this->loadModel('sessions');
        $presentationsModel = $this->loadModel('presentations');
        $liveVotesModel = $this->loadModel('livevotemessages');
        $liveMessagesModel = $this->loadModel('livemessageroundmessages');

        $userSession = $sessionModel->getSessionById($this->getUserSessionId())[0];
        
        $currentAccountId = $userSession['accountId'];
        $currentSessionId = $userSession['id'];
        
        // // Yearly (Session/User) 
        // $lastYearVotes = $liveVotesModel->getLastYearVotesBySessionId($currentSessionId);
        $lastYearMessages = $liveMessagesModel->getLastYearMessagesBySessionId($currentSessionId);
        $lastYearVotes = 0; 
        // $lastYearMessages = array();
        
        // $lastYearUserVotes = $liveVotesModel->getLastYearVotesByAccountId($currentAccountId);
        $lastYearUserMessages = $liveMessagesModel->getLastYearMessagesByAccountId($currentAccountId);
        $lastYearUserVotes = 0; 

        // // Monthly (Session/User)
        $lastMonthVotes = $liveVotesModel->getLastMonthVotesBySessionId($currentSessionId);
        $lastMonthMessages = $liveMessagesModel->getLastMonthMessagesBySessionId($currentSessionId);

        // $lastMonthUserVotes = $liveVotesModel->getLastMonthVotesByAccountId($currentAccountId);
        $lastMonthUserMessages = $liveMessagesModel->getLastMonthMessagesByAccountId($currentAccountId);
        $lastMonthUserVotes = 0;
        // $lastMonthUserMessages = array();

        // // Weekly (Session/User)
        $lastWeekVotes = $liveVotesModel->getLastWeekVotesBySessionId($currentSessionId);
        $lastWeekMessages = $liveMessagesModel->getLastWeekMessagesBySessionId($currentSessionId);
        
        $lastWeekUserVotes = $liveVotesModel->getLastWeekVotesByAccountId($currentAccountId);
        $lastWeekUserMessages = $liveMessagesModel->getLastWeekMessagesByAccountId($currentAccountId);

        // // Last Session
        $latestPresentation = $presentationsModel->getMostRecentBySessionId($currentSessionId);
        $latestPresentationResponseCount = $this->getVoteCount($currentSessionId, $latestPresentation['id']);
        $latestPresentationResponseCount += $this->getMessageCount($currentSessionId, $latestPresentation['id']);
        
        // // Activity
        $recentActivity = $this->getRecentActivityBySessionId($currentSessionId);
        // $recentActivity = array();
        
 
        return json_encode([
            'lastYearResponses' => $lastYearVotes + $lastYearMessages,// 172ms
            'lastYearUserContribution' => $lastYearUserVotes + $lastYearUserMessages,// 8.25s

            'lastMonthResponses' => $lastMonthVotes + $lastMonthMessages,// 172ms
            'lastMonthUserContribution' => $lastMonthUserVotes + $lastMonthUserMessages,//6.7s

            'lastWeekResponses' => $lastWeekVotes + $lastWeekMessages,// 162ms
            'lastWeekUserContribution' => $lastWeekUserVotes + $lastWeekUserMessages,//6.92s

            'lastSession' => $latestPresentationResponseCount,//3.44//You already know the last session ID

            'activity' => $recentActivity//171ms
        ]);
    }
    
    public function getVoteCount($sessionId, $presentationId) {
        $livevotemessagesModel = $this->loadModel('livevotemessages');
        return $livevotemessagesModel->getVoteCountBySessionAndPresentationId($sessionId, $presentationId);
    }

    public function getMessageCount($sessionId, $presentationId) {
        $livemessageroundmessageModel = $this->loadModel('livemessageroundmessages');
        return $livemessageroundmessageModel->getMessageCountBySessionAndPresentationId($sessionId, $presentationId);
    }

    public function getMostRecentPresentationBySessionId($sessionId) {
        // $presentationModel = $this->loadModel('presentations');
    //     $recentPresentations = $presentationModel->getMostRecentBySessionId($sessionId);
        
    //     return $recentPresentations;
    //     // The below generates an unacceptable number of database calls, we are not doing it this way
        // foreach($recentPresentations as $presentation) {
        //     $responseCount = 0;
        //     $responseCount += $this->getVoteCount($sessionId, $presentation['id']);
        //     $responseCount += $this->getMessageCount($sessionId, $presentation['id']);
        //     if($responseCount > 0) {
        //         return $presentation;
        //     }
        // }
        // return null;
    }

    private function getRecentActivityBySessionId($sessionId) {
        
        $liveMessagesModel = $this->loadModel('livemessageroundmessages');
        $recentMessageActivity = $liveMessagesModel->getRecentActivity($sessionId);

        $liveVotesModel = $this->loadModel('livevotemessages');
        $recentVoteActivity = $liveVotesModel->getRecentActivity($sessionId);

        $surveyAnswerModel = $this->loadModel('surveyquestionanswers');
        $recentSurveyActivity = $surveyAnswerModel->getRecentActivity($sessionId);

        // $messageUpvotesModel = $this->loadModel('messageupvotes');
        // $recentUpvoteActivity = $messageUpvotesModel->getRecentActivity($sessionId);

        return [
            'messages' => (int) $recentMessageActivity,
            'votes' => (int) $recentVoteActivity,
            'survey' => (int) $recentSurveyActivity,
            // 'upvotes' => $recentUpvoteActivity
        ];
    }
    
}