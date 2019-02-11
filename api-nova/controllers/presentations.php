<?php
require_once __DIR__.'/../base/nova-api.php';

class Presentations extends NovaAPI {
    public function getOverview() {
        $presentationModel = $this->loadModel('presentations');
        $sessionId = $this->getUserSessionId();
        $results = $presentationModel->getOverviewData($sessionId);
        $numberOfParticipants = $presentationModel->getParticipantNumbersBySessionId($sessionId);
        foreach ($results as $key => $r){
            $results[$key]['numberOfParticipants'] = $numberOfParticipants[$r['id']];
            $parts = explode('\\', $r['name']);
            $results[$key]['name'] = preg_replace('/\\.[^.\\s]{3,4}$/', '', end($parts));
        }
        return json_encode(['content' => $results]);
    }
    
    public function getDetails($id = NULL) {
        // Fetch data from single presentation
        if ($id != NULL) {
            //Add what we can from a the presentation record
            $presentationModel = $this->loadModel('presentations');
            $record = $presentationModel->findActiveById($id)[0];
            $results = array();
            $nrOfResponses = 0;
            $parts = explode('\\', $record['name']);
            $results['presentationTitle'] = preg_replace('/\\.[^.\\s]{3,4}$/', '', end($parts));
            $results['presentationId'] = (int) $record['id'];
            $results['presentationStart'] = $record['startTime'];
            $results['presentationEnd'] = $record['endTime'];
            $results['nrOfActiveAttendees'] = (int) $presentationModel->getParticipantNumbersByPresentationId($id);            
            
            // Check for open ended questions & populate rounds with the results
            $results['rounds'] = $openEndedResult = array();
            $messagesFromDB = $presentationModel->getMessagesByPresentationId($id);
            if (count($messagesFromDB) > 0){
                foreach($messagesFromDB as $key => $m) {
                    if ($key == 0 OR $m['messageRoundId'] != $messagesFromDB[($key-1)]['messageRoundId'] ) {
                        if ($key != 0) {
                            $results['rounds'][] = $openEndedResult;
                            $nrOfResponses += count($openEndedResult['results']);
                            $openEndedResult = array();
                        }
                        //New message round
                        $openEndedResult['id'] = (int) $m['messageRoundId'];
                        $openEndedResult['type'] = 'messages';
                        $openEndedResult['title'] = $m['title'];
                        $openEndedResult['labels'] = [ 0 => 'Message', 1 => 'Date/Time', 2 => 'Status', 3 => 'Upvotes'];           
                    }
                    $openEndedResult['results'][] = [
                        $m['text'],
                        $m['timestamp'],
                        $m['status'],
                        $m['upvotes']
                    ];//This should have a final element with the message's upvote count
                }
                $results['rounds'][] = $openEndedResult;
                $nrOfResponses += count($openEndedResult['results']);
            }
            
            // Check for rating questions & populate rounds with the results
            $ratingsResult = array();
            $slides = $presentationModel->getSlidesByPresentationId($id);
            $votesAndPercentages = $presentationModel->getVotesWithPercentages($id);
            if (count($slides) > 0) {
                $results['slides'] = $slides;
                foreach($slides as $key => $s) {
                    if ($key == 0 OR $s['slideIndex'] != $slides[($key-1)]['slideIndex'] ) {
                        if ($key != 0) {
                            $results['rounds'][] = $ratingsResult;
                            $ratingsResult = array();
                            
                        }
                        //New message round                    
                        $ratingsResult['id'] = $s['id']; // remove?
                        $ratingsResult['type'] = 'votes'; // this will be switched on
                        $ratingsResult['title'] = $s['title']; // question title
                        $ratingsResult['labels'] = [0 => 'Answer', 1 => 'Options', 2 => 'Votes', 3 => 'Percentages', 4 => 'IsCorrect'];
                    }
                    //If there are no votes, there can be no percentages. But the slide will still exist. Hence this 'if'
                    if (isset($votesAndPercentages[$s['id'].'-'.$s['answerCode']])){
                        $votes = (int) $votesAndPercentages[$s['id'].'-'.$s['answerCode']]['votes'];
                        $percentage = $votesAndPercentages[$s['id'].'-'.$s['answerCode']]['percentage'].'%';
                        $nrOfResponses += $votes;
                        $ratingsResult['results'][] = [
                            $s['answerCode'],
                            (int) $s['answer'],
                            $votes,
                            $percentage,
                            (int) $s['correctAnswer']
                        ];
                    }
                }
                $results['rounds'][] = $ratingsResult;
            }
            $results['votesAndPercentages'] = $votesAndPercentages;
            $results['nrOfResponses'] = $nrOfResponses;
            return json_encode(['content' => $results]);                
        }
        return false;
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

    public function getStatistics() {
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
            'lastYearResponses' => $lastYearVotes + $lastYearMessages,
            'lastYearUserContribution' => $lastYearUserVotes + $lastYearUserMessages,

            'lastMonthResponses' => $lastMonthVotes + $lastMonthMessages,
            'lastMonthUserContribution' => $lastMonthUserVotes + $lastMonthUserMessages,

            'lastWeekResponses' => $lastWeekVotes + $lastWeekMessages,
            'lastWeekUserContribution' => $lastWeekUserVotes + $lastWeekUserMessages,

            'lastSession' => $lastSessionResponses,

            'activity' => $recentActivity
        ]);
    }
}
