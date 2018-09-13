<?php 
    require_once __DIR__.'/../../api-common/base/model.php';

    class Users_Model extends Model {
        function getUserById($userId){
            $query = 'SELECT u.email, s.id as sessionId FROM users u LEFT join `sessions` s ON s.userId = u.id WHERE <u.id> = :userId;';
            $params['userId'] = (int) $userId;
            $results = $this->query($query, $params)[0];
            return $results;
        }
        
        function getListFreeUser(){
            $query = 'SELECT 
                a.id AS account_id,
                u.id AS `user_id`,
                u.email,
                u.origin
            FROM `users` u 
            LEFT JOIN accounts a ON u.accountId = a.id
            
            WHERE 
                u.role = "admin" AND 
                a.audienceSize = 20 AND
                u.isDeleted != 1';
            $results = $this->query($query);
            return $results;
        }
    }