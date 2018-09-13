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
            // $query = 'SELECT 
            //     a.id AS account_id,
            //     u.id AS `user_id`,
            //     u.email,
            //     u.origin
            // FROM `users` u 
            // LEFT JOIN accounts a 
            // ON u.accountId = a.id
            // WHERE 
            //     u.role = "admin" AND 
            //     a.audienceSize = 20 AND
            //     u.isDeleted != 1';
            
            
            //Looks like Medoo doesn't like us using Enums. See NOV-3 in Jira
            $query = 'SELECT 
                a.id AS account_id,
                u.email,
                u.origin,
                u.role,
                u.id AS "user_id"
            FROM `users` u 
            LEFT JOIN accounts a 
            ON u.accountId = a.id
            WHERE
                a.audienceSize = 20 AND
                u.isDeleted != 1';
            $resultsDirty = $this->query($query);
            
            $resultsClean = array();
            foreach ($resultsDirty as $key => $r){
                // var_dump($r);exit();
                if ($r['role'] == 'admin'){
                    $resultsClean[] = $resultsDirty[$key];
                }
            }
            
            return $resultsClean;
        }
    }