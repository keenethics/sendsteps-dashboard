<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Surveyquestionanswers_Model extends Model {

    public function getRecentActivity($sessionId) {
        return $this->database()->count(
            'surveyquestionanswers',
            '*',
            [
                'sessionId' => $sessionId,
                'ORDER' => ["timestamp" => "DESC"],
                'LIMIT' => 10
            ]
        );
    }
   
}