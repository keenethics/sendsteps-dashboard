<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Statistics_Model extends Model {
    
    public function findDataForEmailLike($email){
        $query = 'SELECT 
        u.email as "Email", 
            (SELECT COUNT(DISTINCT lvm.id) FROM livevotemessages lvm WHERE lvm.sessionId = s.id) AS Votes,
            (SELECT COUNT(DISTINCT lmrm.id) FROM livemessageroundmessages lmrm WHERE lmrm.sessionId = s.id) AS Messages,
            (SELECT COUNT(DISTINCT sr.id) FROM sessionruns sr WHERE sr.sessionId = s.id) AS "Sessions Run"
        FROM users u
        LEFT JOIN sessions s ON u.id = userId
        WHERE u.email LIKE :email
        GROUP BY u.email;';
        $params['email'] = '%'.$email.'%';
        $results = $this->query($query, $params);
        return $results;
    }
}