<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Sessionruns_Model extends Model {

    public function getOpenedBySessionId($sessionId) {
        return $this->database()->select(
            'sessionruns',
            "*",
            [
                'sessionId' => $sessionId,
                'endTime' => 0
            ]
        );
    }

}