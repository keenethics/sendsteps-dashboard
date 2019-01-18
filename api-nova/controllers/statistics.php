<?php
require_once __DIR__.'/../base/nova-api.php';

class Statistics extends NovaAPI {
    public function getSuperadmin() {
        $model = $this->loadModel('statistics');
        $results = $model->findDataForEmailLike('frieslandcampina.com');
        return json_encode(['content' => $results]);
    }
}