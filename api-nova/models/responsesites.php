<?php 
    require_once __DIR__.'/../../api-common/base/model.php';

    class Responsesites_Model extends Model {
        function getActiveList(){
            $query = 'SELECT id, domain FROM `response_websites` WHERE isDeleted = 0 ORDER BY domain;';
            $results = $this->query($query);
            return $results;
        }
        function getActiveById($id){
            $query = 'SELECT * FROM `response_websites` WHERE isDeleted = 0 AND <id> = :id;';
            $params['id'] = $id;
            $results = $this->query($query, $params);
            return $results;
        }
    }