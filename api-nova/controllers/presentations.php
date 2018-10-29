<?php
require_once __DIR__.'/../base/nova-api.php';

class Presentations extends NovaAPI {
    public function getOverview() {
        $presentaionModel = $this->loadModel('presentations');
        $sessionId = $this->getUserSessionId();
        $results = $presentaionModel->getOverviewData($sessionId);
        $numberOfParticipants = $presentaionModel->getParticipantNumbersBySessionId($sessionId);
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
            $presentaionModel = $this->loadModel('presentations');
            $record = $presentaionModel->findActiveById($id)[0];
            $results = array();
            $nrOfResponses = 0;
            $parts = explode('\\', $record['name']);
            $results['presentationTitle'] = preg_replace('/\\.[^.\\s]{3,4}$/', '', end($parts));
            $results['presentationId'] = (int) $record['id'];
            $results['presentationStart'] = $record['startTime'];
            $results['presentationEnd'] = $record['endTime'];
            $results['nrOfActiveAttendees'] = (int) $presentaionModel->getParticipantNumbersByPresentationId($id);            
            
            // Check for open ended questions & populate rounds with the results
            $results['rounds'] = $openEndedResult = array();
            $messagesFromDB = $presentaionModel->getMessagesByPresentationId($id);
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
            $slides = $presentaionModel->getSlidesByPresentationId($id);
            $votesAndPercentages = $presentaionModel->getVotesWithPercentages($id);
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
}