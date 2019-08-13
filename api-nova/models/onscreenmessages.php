<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Onscreenmessages_model extends Model {

    public function getByMessageroundId($messageroundId) {
        return $this->database()->select(
            'onscreenmessages',
            '*',
            [ 'messageRoundId' => $messageroundId ]
        );
    }
}