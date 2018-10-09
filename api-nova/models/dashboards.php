<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Dashboards_Model extends Model {
    public function getOverview(){
        $query = "SELECT id, `name`, websiteAddress, dashboardUrl FROM addinsettings WHERE `name` NOT LIKE 'Sendsteps';";
        $results = $this->query($query);
        return $results;
    }
    
    public function findById($id){
        $results = $this->findByIdCentral($id, 'addinsettings');
        // $query = 'SELECT * FROM addinsettings WHERE <id> = :id;';
        // $params['id'] = $id;
        // $results = $this->query($query, $params);
        return $results;
    }
}