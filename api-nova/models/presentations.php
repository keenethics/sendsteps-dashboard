<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Presentations_Model extends Model {
    public function getOverviewData($sessionId){
        $query = 'SELECT p.id AS id, p.name, s.startTime  FROM presentations p
            LEFT JOIN sessionruns s ON s. id = p.sessionRunId
            WHERE 
                p.active = 1 AND
                <s.sessionId> = :sessionId
            GROUP BY p.id
        ;';
        $params['sessionId'] = $sessionId;
        $results = $this->query($query, $params);
        return $results;
    }
    
    public function findActiveById($presentationId){
        $query = 'SELECT p.*, s.*
            FROM presentations p
            LEFT JOIN sessionruns s ON s.id = p.sessionRunId
            WHERE 
                p.active = 1 AND
                p.isDeleted = 0 AND
                <p.id> = :presentationId
        ;';
        $params['presentationId'] = $presentationId;
        $results = $this->query($query, $params);
        return $results;
    }
    
    public function getParticipantNumbersBySessionId($sessionId) {
        $query = "SELECT 
                a.id,
                COUNT(DISTINCT a.participantId) as participantCount
            FROM (
                (
                    SELECT presentations.id,livevotemessages.participantId
                    FROM presentations
                    LEFT JOIN votes on presentations.id = votes.presentationId
                    LEFT JOIN livevotemessages on votes.id = livevotemessages.voteId
                    LEFT JOIN sessionruns s ON s.id = presentations.sessionRunId
                    WHERE 
                        presentations.active = 1 AND
                        <s.sessionId> = :sessionId1
                ) UNION ALL (
                    SELECT presentations.id,livemessageroundmessages.participantId
                    FROM presentations
                    LEFT JOIN messagerounds on presentations.id = messagerounds.presentationId
                    LEFT JOIN livemessageroundmessages on messagerounds.id = livemessageroundmessages.messageRoundId
                    LEFT JOIN sessionruns s ON s.id = presentations.sessionRunId
                    WHERE 
                        presentations.active = 1 AND
                        <s.sessionId> = :sessionId2
                )
            ) AS a
            GROUP BY a.id
        ;";
        $params['sessionId1'] = $sessionId;
        $params['sessionId2'] = $sessionId;
        $data = $this->query($query, $params);
        foreach($data as $row) {
            $results[$row['id']] = $row['participantCount'];
        }
        return $results;
    }
    
    public function getParticipantNumbersByPresentationId($presentationId) {
        $query = "SELECT 
                COUNT(DISTINCT a.participantId) as participantCount
            FROM (
                (
                    SELECT presentations.id,livevotemessages.participantId
                    FROM presentations
                    LEFT JOIN votes on presentations.id = votes.presentationId
                    LEFT JOIN livevotemessages on votes.id = livevotemessages.voteId
                    WHERE 
                        presentations.active = 1 AND
                        <presentations.id> = :presentationId1
                ) UNION ALL (
                    SELECT presentations.id,livemessageroundmessages.participantId
                    FROM presentations
                    LEFT JOIN messagerounds on presentations.id = messagerounds.presentationId
                    LEFT JOIN livemessageroundmessages on messagerounds.id = livemessageroundmessages.messageRoundId
                    WHERE 
                        presentations.active = 1 AND
                        <presentations.id> = :presentationId2
                )
            ) AS a
            GROUP BY a.id
        ;";
        $params['presentationId1'] = $presentationId;
        $params['presentationId2'] = $presentationId;
        $data = $this->query($query, $params)[0]['participantCount'];
        return $data;
    }
    
    public function getMessagesByPresentationId($presentationId){
        $query = "SELECT 
            mr.title, lmrm.status, lmrm.timestamp, lmrm.text, lmrm.messageRoundId,
            (SELECT COUNT(mu.id) FROM `messageupvotes` mu 
                WHERE mu.messageId = lmrm.id
            ) AS upvotes
            FROM `messagerounds` mr
            LEFT JOIN `livemessageroundmessages` lmrm ON lmrm.messageRoundId = mr.id 
            WHERE <mr.presentationId> = :presentationId
            ORDER BY mr.id
        ;";
        $params['presentationId'] = $presentationId;
        $data = $this->query($query, $params);
        return $data;
    }
    
    public function getSlidesByPresentationId($presentationId){
        $query = "SELECT 
            v.id, v.slideIndex, v.presentationId, v.title, v.graphType, 
            va.answer, va.answerCode, va.correctAnswer
            FROM votes v
            LEFT JOIN voteanswers va ON va.voteId = v.id
            WHERE <v.presentationId> = :presentationId
            ORDER BY v.slideIndex
        ;";
        $params['presentationId'] = $presentationId;
        $data = $this->query($query, $params);
        return $data;
    }
    
    public function getVotesWithPercentages($presentationId){
        $voteIds = array(2250597,2250598, 2250599);
        $query = "SELECT 
            COUNT(lvm.voteId) AS votes, 
            lvm.voteId, 
            lvm.text,
            (SELECT ROUND(COUNT(lvm.voteId)/COUNT(t2.id), 2) FROM livevotemessages t2 WHERE t2.voteId = lvm.voteId) AS `percentage`
            FROM livevotemessages lvm
            LEFT JOIN votes v ON lvm.voteId = v.id
            WHERE <v.presentationId> = :presentationId
            GROUP BY lvm.voteId, lvm.text
        ;";
        $params['presentationId'] = $presentationId;
        $results = $this->query($query, $params); 
        $returned = array();
        foreach ($results as $r){
            $returned[$r['voteId'].'-'.$r['text']] = [
                'votes' => $r['votes'],
                'percentage' => $r['percentage'],
            ];
        }
        return $returned;
        
    }
}