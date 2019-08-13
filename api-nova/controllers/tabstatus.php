<?php

require_once __DIR__.'/../base/nova-api.php';

class Tabstatus extends NovaAPI {

    public function getResultsTabStatus() {
        $model = $this->loadModel('tabstatus');
        return $model->getResultTabsBySessionId(
            $this->getUserSessionId()
        );
    }

    public function getTweetsTabStatus() {
        $model = $this->loadModel('tabstatus');
        return $model->getTweetsTabBySessionId(
            $this->getUserSessionId()
        );
    }

    public function getSurveyTabStatus() {
        $model = $this->loadModel('tabstatus');
        return $model->getSurveyTabBySessionId(
            $this->getUserSessionId()
        );
    }

    public function getProgramTabStatus() {
        $model = $this->loadModel('tabstatus');
        return $model->getProgramTabBySessionId(
            $this->getUserSessionId()
        );
    }

    public function getResponseTabStatus() {
        $model = $this->loadModel('tabstatus');
        return $model->getResponseTabBySessionId(
            $this->getUserSessionId()
        ); 
    }

    public function updateResultsActive($newStatus) {
        $model = $this->loadModel('tabstatus');
        return $model->setResultsTabBySessionId(
            $this->getUserSessionId(),
            $newStatus
        );
    }

    public function updateTweetActive($newStatus) {
        $model = $this->loadModel('tabstatus');
        return $model->setTweetsTabBySessionId(
            $this->getUserSessionId(),
            $newStatus
        );
    }

    public function updateSurveyActive(Request $request) {
        $model = $this->loadModel('tabstatus');
        if($model->setSurveyTabBySessionId($this->getUserSessionId(), $request->status)) {
            return json_encode($this->getSurveyTabStatus());
        }
        return false;
    }

    public function updateProgramActive($newStatus) {
        $model = $this->loadModel('tabstatus');
        return $model->setProgramTabBySessionId(
            $this->getUserSessionId(),
            $newStatus
        );
    }

    public function updateResponseActive($newStatus) {
        $model = $this->loadModel('tabstatus');
        return $model->setResponseTabBySessionId(
            $this->getUserSessionId(),
            $newStatus
        );
    }
}