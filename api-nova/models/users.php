<?php 
    require_once __DIR__.'/../../api-common/base/model.php';

    class Users_Model extends Model {
        function getUserById($userId){
            $query = $this->query('SELECT u.email, s.id as sessionId FROM users u LEFT join `sessions` s ON s.userId = u.id WHERE u.id = <userId>;');
            $params['userId'] = $userId;
            $results = $this->query($query, $params);
            return $results;
        }
    }