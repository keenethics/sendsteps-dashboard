<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Countries_Model extends Model {
    public function listAll(){
        $results = $this->query('SELECT isoCode, `name` FROM countries');
        return $results;
    }
}