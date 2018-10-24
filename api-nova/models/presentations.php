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
        // $presentationIds = '('.implode( ",", $presentationIds ).')';
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
        // $presentationIds = '('.implode( ",", $presentationIds ).')';
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
        // foreach($data as $row) {
        //     $results[$row['id']] = $row['participantCount'];
        // }
        return $data;
    }
    
    public function getMessagesByPresentationId($presentationId){
        $query = "SELECT * 
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
}