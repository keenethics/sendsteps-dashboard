<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Sessions_Model extends Model {
    public function getSessionById($sessionId){
        $query = 'SELECT * FROM `sessions` WHERE <id> = :sessionId;';
        $params['sessionId'] = $sessionId;
        $results = $this->query($query, $params);
        return $results;
    }
    
    public function getOverview(){

        $query = "SELECT
                s.id AS `sessionId`,
                u.email,
                u.id as `user_id`,
                DATE_FORMAT(s.endTime, '%Y-%m-%d') AS endTime,
                COUNT(r.id) AS numSessionsStarted,
                MAX(r.startTime) AS lastSessionStarted,
                a.name AS pluginName,
                u.role AS userRole,
                s.internetKeyword as responseCode
            FROM
                `sessions` s
                LEFT JOIN users u ON u.id = s.userId
                LEFT JOIN sessionruns r ON r.sessionId = s.id
                LEFT JOIN addinsettings a ON a.id = s.pluginId
            WHERE
                u.isDeleted = 0
            GROUP BY s.id";
        $params = array();
        $results = $this->query($query, $params);
        return $results;
    }
    
}