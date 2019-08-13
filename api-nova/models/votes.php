<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Votes_Model extends Model {

    public function getActiveByPresentationIdsAndSessionId($presentationIds, $sessionId) {
        return $this->database()->select(
            'votes',
            '*',
            [ 
                'currentSessionId' => $sessionId,
                'presentationId' => $presentationIds
            ]
        );
    }
}