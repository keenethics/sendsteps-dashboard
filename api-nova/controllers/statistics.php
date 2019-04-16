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
        
        // Yearly (Session/User) 
        $lastYearVotes = $liveVotesModel->getLastYearVotesBySessionId($currentSessionId);
        $lastYearMessages = $liveMessagesModel->getLastYearMessagesBySessionId($currentSessionId);
        
        $lastYearUserVotes = $liveVotesModel->getLastYearVotesByAccountId($currentAccountId);
        $lastYearUserMessages = $liveMessagesModel->getLastYearMessagesByAccountId($currentAccountId);

        // Monthly (Session/User)
        $lastMonthVotes = $liveVotesModel->getLastMonthVotesBySessionId($currentSessionId);
        $lastMonthMessages = $liveMessagesModel->getLastMonthMessagesBySessionId($currentSessionId);

        $lastMonthUserVotes = $liveVotesModel->getLastMonthVotesByAccountId($currentAccountId);
        $lastMonthUserMessages = $liveMessagesModel->getLastMonthMessagesByAccountId($currentAccountId);

        // Weekly (Session/User)
        $lastWeekVotes = $liveVotesModel->getLastWeekVotesBySessionId($currentSessionId);
        $lastWeekMessages = $liveMessagesModel->getLastWeekMessagesBySessionId($currentSessionId);
        
        $lastWeekUserVotes = $liveVotesModel->getLastWeekVotesByAccountId($currentAccountId);
        $lastWeekUserMessages = $liveMessagesModel->getLastWeekMessagesByAccountId($currentAccountId);

        // Last Session
        $mostRecentPresentation = $this->getMostRecentPresentationBySessionId($currentSessionId);
        $lastSessionResponses = $mostRecentPresentation ? $presentationsModel->getTotalResponses($mostRecentPresentation) : 0;

        // Activity
        $recentActivity = $this->getRecentActivityBySessionId($currentSessionId);
 
        return json_encode([
            'lastYearResponses' => $lastYearVotes + $lastYearMessages,// 172ms
            'lastYearUserContribution' => $lastYearUserVotes + $lastYearUserMessages,// 8.25s

            'lastMonthResponses' => $lastMonthVotes + $lastMonthMessages,// 172ms
            'lastMonthUserContribution' => $lastMonthUserVotes + $lastMonthUserMessages,//6.7s

            'lastWeekResponses' => $lastWeekVotes + $lastWeekMessages,// 162ms
            'lastWeekUserContribution' => $lastWeekUserVotes + $lastWeekUserMessages,//6.92s

            'lastSession' => $lastSessionResponses,//3.44

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
        $presentationModel = $this->loadModel('presentations');
        $recentPresentations = $presentationModel->getMostRecentBySessionId($sessionId);
        foreach($recentPresentations as $presentation) {
            $responseCount = 0;
            $responseCount += $this->getVoteCount($sessionId, $presentation['id']);
            $responseCount += $this->getMessageCount($sessionId, $presentation['id']);
            if($responseCount > 0) {
                return $presentation;
            }
        }
        return null;
    }

    public function getRecentActivityBySessionId($sessionId) {
        
        $liveMessagesModel = $this->loadModel('livemessageroundmessages');
        $recentMessageActivity = $liveMessagesModel->getRecentActivity($sessionId);

        $liveVotesModel = $this->loadModel('livevotemessages');
        $recentVoteActivity = $liveVotesModel->getRecentActivity($sessionId);

        $surveyAnswerModel = $this->loadModel('surveyquestionanswers');
        $recentSurveyActivity = $surveyAnswerModel->getRecentActivity($sessionId);

        $messageUpvotesModel = $this->loadModel('messageupvotes');
        $recentUpvoteActivity = $messageUpvotesModel->getRecentActivity($sessionId);

        return [
            'messages' => $recentMessageActivity,
            'votes' => $recentVoteActivity,
            'survey' => $recentSurveyActivity,
            'upvotes' => $recentUpvoteActivity
        ];
    }
    
}