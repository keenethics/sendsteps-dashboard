<?php
require_once __DIR__.'/../base/nova-api.php';

class Presentations extends NovaAPI {
    public function getOverview(){
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
            $presentaionModel = $this->loadModel('presentations');
            $record = $presentaionModel->findActiveById($id)[0];
            
            
            
            $results = array();
            $parts = explode('\\', $record['name']);
            $results['presentationTitle'] = preg_replace('/\\.[^.\\s]{3,4}$/', '', end($parts));
            $results['presentationId'] = (int) $record['id'];
            $results['presentationStart'] = $record['startTime'];
            $results['presentationEnd'] = $record['endTime'];
            // $parts = explode('\\', $record['name']);
            $results['nrOfActiveAttendees'] = (int) $presentaionModel->getParticipantNumbersByPresentationId($id);
            
            
            
            // Loop Through the messages & message rounds once & use this process to populate remaining parts of the array
            $nrOfResponses = 0;
            $messages = $messagesSubArray = array();
            $messagesFromDB = $presentaionModel->getMessagesByPresentationId($id);
            if (count($messagesFromDB) > 0){
                foreach($messagesFromDB as $key => $m) {
                    if ($key == 0 OR $m['messageRoundId'] != $messagesFromDB[($key-1)]['messageRoundId'] ) {
                        if ($key != 0) {
                            $messages[] = $messagesSubArray;
                            $nrOfResponses += count($messagesSubArray['results']);
                            $messagesSubArray = array();
                        }
                        //New message round
                        $messagesSubArray['id'] = (int) $m['messageRoundId'];
                        $messagesSubArray['type'] = 'messages';
                        $messagesSubArray['title'] = $m['title'];
                        $messagesSubArray['labels'] = [ 0 => 'Message', 1 => 'Date/Time', 2 => 'Status', 3 => 'Upvotes'];           
                    }
                    $messagesSubArray['results'][] = [
                        $m['text'],
                        $m['timestamp'],
                        $m['status'] 
                    ];//This should have a final element with the message's upvote count
                }
                $messages[] = $messagesSubArray;
                $nrOfResponses += count($messagesSubArray['results']);
            }
            
            $results['rounds'] = $messages;
            $results['nrOfResponses'] = $nrOfResponses;
            
            
            return json_encode(['content' => $results]);                
        }
        return false;        
        // $rounds[] = [
        //     'id' => $messageRoundId,
        //     'type' => 'messages',
        //     'title' => $messageRound['title'],
        //     'labels' => [
        //         0 => 'Message',
        //         1 => 'Date/Time',
        //         2 => 'Status',
        //         3 => 'Upvotes'
        //     ],
        //     'results' => array_reduce($participants, function ($carry, $participant) use ($messageRoundId, $id, &$nrOfResponses) {
        //         if (isset($participant['answers'][$id]) &&
        //             isset($participant['answers'][$id]['messageRound'][$messageRoundId])) {
        //             $messages = $participant['answers'][$id]['messageRound'][$messageRoundId];
        //             foreach ($messages as $message) {
        //                 $nrOfResponses++;
        //                 if($participant['answers'][$id]['messageRound'] || true /* always true, for now */) {
        //                     // Handle for upvoting enabled/disabled in messagerounds @TODO
        //                     $carry[] = [0 => $message->text, 1 => $message->timestamp, 2 => $message->status, 3 => $message->upvoteCount];
        //                 } 
        //             }
        //         }
        //         return $carry;
        //     }, []),
        // ];
          
        // 'hideResults' => $user->isFreeUser() && !$presentation->duringDayUpgrade(),
        // 'presentationTitle' => $presentationTitle,
        // 'wordCloudSettings' => Wordcloudsettings::getByUser($user)->toArray(),
        // 'rounds' => $rounds, // the presentation results themselves
        // 'apiBasePath' => Yii::$app->params['apiBasePath'], // individual results
        // 'sessionId' => $user->sessionId, // individual results
        // 'userId' => Yii::$app->user->getId(), // individual results
        // 'urlBase' => Yii::$app->getHomeUrl() // individual results
        
        
    }
}


// array(2) {
//     [0]=>
//     array(5) {
//       ["id"]=>
//       int(331256)
//       ["type"]=>
//       string(8) "messages"
//       ["title"]=>
//       string(21) "How was your weekend?"
//       ["labels"]=>
//       array(4) {
//         [0]=>
//         string(7) "Message"
//         [1]=>
//         string(9) "Date/Time"
//         [2]=>
//         string(6) "Status"
//         [3]=>
//         string(7) "Upvotes"
//       }
//       ["results"]=>
//       array(12) {
//         [0]=>
//         array(4) {
//           [0]=>
//           string(5) "Great"
//           [1]=>
//           string(19) "2018-05-14 12:20:31"
//           [2]=>
//           string(5) "shown"
//           [3]=>
//           int(0)
//         }
//         [1]=>
//         array(4) {
//           [0]=>
//           string(3) "Hot"
//           [1]=>
//           string(19) "2018-05-14 12:20:36"
//           [2]=>
//           string(5) "shown"
//           [3]=>
//           int(0)
//         }
//         [2]=>
//         array(4) {
//           [0]=>
//           string(8) "Neutral "
//           [1]=>
//           string(19) "2018-05-14 12:20:38"
//           [2]=>
//           string(5) "shown"
//           [3]=>
//           int(0)
//         }
//         [3]=>
//         array(4) {
//           [0]=>
//           string(6) "assen!"
//           [1]=>
//           string(19) "2018-05-14 12:20:49"
//           [2]=>
//           string(5) "shown"
//           [3]=>
//           int(0)
//         }
//         [4]=>
//         array(4) {
//           [0]=>
//           string(5) "Great"
//           [1]=>
//           string(19) "2018-05-14 12:20:34"
//           [2]=>
//           string(5) "shown"
//           [3]=>
//           int(0)
//         }
//         [5]=>
//         array(4) {
//           [0]=>
//           string(4) "Busy"
//           [1]=>
//           string(19) "2018-05-14 12:20:40"
//           [2]=>
//           string(7) "showing"
//           [3]=>
//           int(0)
//         }
//         [6]=>
//         array(4) {
//           [0]=>
//           string(9) "Comme Ça"
//           [1]=>
//           string(19) "2018-05-14 12:20:39"
//           [2]=>
//           string(7) "showing"
//           [3]=>
//           int(0)
//         }
//         [7]=>
//         array(4) {
//           [0]=>
//           string(4) "Avec"
//           [1]=>
//           string(19) "2018-05-14 12:21:00"
//           [2]=>
//           string(5) "shown"
//           [3]=>
//           int(0)
//         }
//         [8]=>
//         array(4) {
//           [0]=>
//           string(3) "Oui"
//           [1]=>
//           string(19) "2018-05-14 12:21:04"
//           [2]=>
//           string(5) "shown"
//           [3]=>
//           int(0)
//         }
//         [9]=>
//         array(4) {
//           [0]=>
//           string(5) "Laggy"
//           [1]=>
//           string(19) "2018-05-14 12:20:53"
//           [2]=>
//           string(5) "shown"
//           [3]=>
//           int(0)
//         }
//         [10]=>
//         array(4) {
//           [0]=>
//           string(4) "Nice"
//           [1]=>
//           string(19) "2018-05-14 12:20:28"
//           [2]=>
//           string(5) "shown"
//           [3]=>
//           int(0)
//         }
//         [11]=>
//         array(4) {
//           [0]=>
//           string(4) "Good"
//           [1]=>
//           string(19) "2018-05-14 12:20:45"
//           [2]=>
//           string(7) "showing"
//           [3]=>
//           int(0)
//         }
//       }
//     }
//     [1]=>
//     array(5) {
//       ["id"]=>
//       int(331257)
//       ["type"]=>
//       string(8) "messages"
//       ["title"]=>
//       string(14) "Any questions?"
//       ["labels"]=>
//       array(4) {
//         [0]=>
//         string(7) "Message"
//         [1]=>
//         string(9) "Date/Time"
//         [2]=>
//         string(6) "Status"
//         [3]=>
//         string(7) "Upvotes"
//       }
//       ["results"]=>
//       array(2) {
//         [0]=>
//         array(4) {
//           [0]=>
//           string(20) "what kind of errors?"
//           [1]=>
//           string(19) "2018-05-14 12:29:17"
//           [2]=>
//           string(7) "showing"
//           [3]=>
//           int(0)
//         }
//         [1]=>
//         array(4) {
//           [0]=>
//           string(2) "No"
//           [1]=>
//           string(19) "2018-05-14 12:27:57"
//           [2]=>
//           string(7) "showing"
//           [3]=>
//           int(0)
//         }
//       }
//     }
//   }