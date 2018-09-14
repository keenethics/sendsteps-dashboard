
<?php
require_once __DIR__.'/../base/nova-api.php';

class Dashboards extends NovaAPI {
    function getOverview(){
        $model = $this->loadModel('dashboards');
        $results = $model->getOverview();
        return json_encode(['content' => $results]);     
    }
    
    function getDetails($id = NULL) {
        // Fetch data from single phonenumber
        if($id != NULL){
            $model = $this->loadModel('dashboards');
            $results = $model->findById($id);
            return json_encode(['content' => $results]);                
        }
        return false;        
    }
}