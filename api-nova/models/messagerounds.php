<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Messagerounds_model extends Model {

    public function getActiveByPresentationIdsAndSessionId($sessionId, $presentationIds) {
        return $this->database()->select(
            'messagerounds',
            '*',
            [
                'currentSessionId' => $sessionId,
                'presentationId' => $presentationIds,
            ]
        );
    }
}