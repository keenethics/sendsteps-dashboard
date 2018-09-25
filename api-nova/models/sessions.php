<?php 
    require_once __DIR__.'/../../api-common/base/model.php';

    class Sessions_Model extends Model {
        public function getSessionById($sessionId){
            $query = 'SELECT * FROM `sessions` WHERE <id> = :sessionId;';
            $params['sessionId'] = $sessionId;
            $results = $this->query($query, $params);
            return $results;
        }
    }