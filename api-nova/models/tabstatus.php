<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Tabstatus_Model extends Model {

    const RESULTS_TAB = 1;
    const TWEETS_TAB = 2;
    const SURVEY_TAB = 3;
    const PROGRAM_TAB = 4;
    const RESPONSE_TAB = 5;

    private function getSessionTabsByTabId($tabId, $sessionId) {
        $result = $this->database()->get(
            'tab_status',
            [
                'status'
            ],
            [
                'tab_id' => $tabId,
                'session_id' => $sessionId
            ]
        );
        return $result;
    }

    private function setTabByTabIdAndSessionId($tabId, $sessionId, $newStatus) {
        $result = $this->database()->update(
            'tab_status',
            [ 'status' => $newStatus ],
            [
                'tab_id' => $tabId,
                'session_id' => $sessionId
            ]
        );

        if($result->execute()) {
            return true;
        }
        
        return false;
    }

    public function setResultsTabBySessionId($sessionId, $newStatus) {
        return $this->setTabByTabIdAndSessionId(
            self::RESULTS_TAB,
            $sessionId,
            $newStatus
        );
    }

    public function setTweetsTabBySessionId($sessionId, $newStatus) {
        return $this->setTabByTabIdAndSessionId(
            self::TWEETS_TAB,
            $sessionId,
            $newStatus
        );
    }

    public function setSurveyTabBySessionId($sessionId, $newStatus) {
        return $this->setTabByTabIdAndSessionId(
            self::SURVEY_TAB,
            $sessionId,
            $newStatus
        );
    }

    public function setProgramTabBySessionId($sessionId, $newStatus) {
        return $this->setTabByTabIdAndSessionId(
            self::PROGRAM_TAB,
            $sessionId,
            $newStatus
        );
    }

    public function setResponseTabBySessionId($sessionId, $newStatus) {
        return $this->setTabByTabIdAndSessionId(
            self::RESPONSE_TAB,
            $sessionId,
            $newStatus
        );
    }

    public function getResultTabsBySessionId($sessionId) {
        return $this->getSessionTabsByTabId(
            self::RESULTS_TAB,
            $sessionId
        );
    }

    public function getTweetsTabBySessionId($sessionId) {
        return $this->getSessionTabsByTabId(
            self::TWEETS_TAB,
            $sessionId
        );
    }

    public function getSurveyTabBySessionId($sessionId) {
        return $this->getSessionTabsByTabId(
            self::SURVEY_TAB,
            $sessionId
        );
    }

    public function getProgramTabBySessionId($sessionId) {
        return $this->getSessionTabsByTabId(
            self::PROGRAM_TAB,
            $sessionId
        );
    }

    public function getResponseTabBySessionId($sessionId) {
        return $this->getSessionTabsByTabId(
            self::RESPONSE_TAB,
            $sessionId
        );
    }

}