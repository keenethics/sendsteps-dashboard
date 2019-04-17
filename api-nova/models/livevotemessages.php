<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Livevotemessages_model extends Model {

    public function getLastYearVotesByAccountId($accountId) {
        return $this->database()->count(
            'livevotemessages',
            [
                '[>]sessions' => [
                    'livevotemessages.sessionId' => 'id'
                ]
            ],
            '*',
            [
                'timestamp[<>]' => [
                    gmdate('Y-m-d H:i:s', time() - (60*60*24*365)),
                    gmdate('Y-m-d H:i:s')
                ],
                'accountId' => $accountId
            ]
        );
    }
    
    public function getLastYearVotesBySessionId($sessionId) {
        return $this->database()->count(
            'livevotemessages',
            [
                'sessionId' => $sessionId,
                'timestamp[<>]' => [
                    gmdate('Y-m-d H:i:s', time() - (60*60*24*365)),
                    gmdate('Y-m-d H:i:s')
                ]
            ]
        );
    }

    public function getLastMonthVotesByAccountId($accountId) {
        return $this->database()->count(
            'livevotemessages',
            [
                '[>]sessions' => [
                    'livevotemessages.sessionId' => 'id'
                ]
            ],
            '*',
            [
                'accountId' => $accountId,
                'timestamp[<>]' => [
                    gmdate('Y-m-d H:i:s', time() - (60*60*24*30)),
                    gmdate('Y-m-d H:i:s')
                ]
            ]
        );
    }

    public function getLastMonthVotesBySessionId($sessionId) {
        return $this->database()->count(
            'livevotemessages',
            [
                'sessionId' => $sessionId,
                'timestamp[<>]' => [
                    gmdate('Y-m-d H:i:s', time() - (60*60*24*30)),
                    gmdate('Y-m-d H:i:s')
                ]
            ]
        );
    }

    public function getLastWeekVotesByAccountId($accountId) {
        return $this->database()->count(
            'livevotemessages',
            [
                '[>]sessions' => [
                    'livevotemessages.sessionId' => 'id'
                ]
            ],
            'count(id)',
            [
                'accountId' => $accountId,
                'timestamp[<>]' => [
                    gmdate('Y-m-d H:i:s', time() - (60*60*24*7)),
                    gmdate('Y-m-d H:i:s')
                ]
            ]
        );
    }

    public function getLastWeekVotesBySessionId($sessionId) {
        return $this->database()->count(
            'livevotemessages',
            [
                'sessionId' => $sessionId,
                'timestamp[<>]' => [
                    gmdate('Y-m-d H:i:s', time() - (60*60*24*7)),
                    gmdate('Y-m-d H:i:s')
                ]
            ]
        );
    }

    public function getVoteCountBySessionAndPresentationId($sessionId, $presentationId) {
        return $this->database()->count(
            'livevotemessages',
            [
                '[>]votes' => [
                    'livevotemessages.id' => 'votes.id'
                ]
            ],
            'count(id)',
            [
                'presentationId' => $presentationId,
                'sessionId' => $sessionId
            ]
        );
    }

    public function getRecentActivity($sessionId) {
        return $this->database()->select(
            'livevotemessages',
            'count(id)',
            [
                'sessionId' => $sessionId,
                'LIMIT' => 10,
                'ORDER' => ["timestamp" => "DESC"]
            ]
        );
    }

}