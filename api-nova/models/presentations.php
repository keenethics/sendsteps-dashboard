<?php 
    require_once __DIR__.'/../../api-common/base/model.php';

    class Presentations_Model extends Model {
        function getOverviewData($sessionId){
            $query = 'SELECT p.id AS presentationId, p.name, s.startTime  FROM presentations p
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
        
        function findActiveById($presentationId){
            $query = 'SELECT p.*, s.*
                FROM presentations p
                LEFT JOIN sessionruns s ON s.id = p.sessionRunId
                WHERE 
                    p.active = 1 AND
                    <p.id> = :presentationId
            ;';
            $params['presentationId'] = $presentationId;
            $results = $this->query($query, $params);
            return $results;
        }
        
        function getNumberOfParticipants($presentationIds = array()) {
            $presentationIds = '('.implode( ",", $presentationIds ).')';
            $query = "SELECT 
                    a.id,
                    COUNT(DISTINCT a.participantId) as participantCount
                FROM (
                    (
                        SELECT presentations.id,livevotemessages.participantId
                        FROM presentations
                        LEFT JOIN votes on presentations.id = votes.presentationId
                        LEFT JOIN livevotemessages on votes.id = livevotemessages.voteId
                        WHERE <presentations.id> IN ".$presentationIds."
                    ) UNION ALL (
                        SELECT presentations.id,livemessageroundmessages.participantId
                        FROM presentations
                        LEFT JOIN messagerounds on presentations.id = messagerounds.presentationId
                        LEFT JOIN livemessageroundmessages on messagerounds.id = livemessageroundmessages.messageRoundId
                        WHERE <presentations.id> IN ".$presentationIds."
                    )
                ) AS a
                GROUP BY a.id
            ;";
            $data = $this->query($query);

            
            
            
            // $query = "SELECT * FROM presentations WHERE <presentations.id> IN :presentationIds  ";
            // $params['presentationIds'] =' "('.implode( ",", $presentationIds ).')"';
            // // $params['presentationIds'] =  $presentationIds ;
            // // var_dump($params);exit();
            // $data = $this->query($query, $params);
            // var_dump($data);exit();
            // $results = [];
            foreach($data as $row) {
                $results[$row['id']] = $row['participantCount'];
            }
            return $results;
        }
    }
    
?>