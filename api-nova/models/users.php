<?php 
    require_once __DIR__.'/../../api-common/base/model.php';

    class Users_Model extends Model {
        function getSessionIdFromUserId($userId){
            $query = 'SELECT s.id as sessionId FROM users u LEFT join `sessions` s ON s.userId = u.id WHERE <u.id> = :userId AND isDeleted = 0;';
            $params['userId'] = (int) $userId;
            $results = $this->query($query, $params)[0];
            return $results;
        }
        
        function getProfileFromId($userId){
            // u.email, u.firstName, u.lastName, u.id, u.departmentName, `u.language`, u.phonenumber, a.timezone, a.university 
            $query = 'SELECT 
                u.email, u.firstName, u.lastName, u.id, 
                u.departmentName, u.language, u.phonenumber, 
                a.timezone, a.university AS organisation, 
                u.role 
                FROM users u 
                LEFT JOIN accounts a 
                ON a.id = u.accountId 
                WHERE 
                <u.id> = :userId AND isDeleted = 0;';
            // $query = 'SELECT * FROM users u LEFT JOIN accounts a ON a.id = u.accountId WHERE <u.id> = :userId AND isDeleted = 0;';
            $params['userId'] = (int) $userId;
            $results = $this->query($query, $params)[0];
            return $results;
            
        }
        function getListFreeUser(){            
            //Looks like Medoo doesn't like us using Enums in the WHERE clause. See NOV-3 in Jira
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
                if ($r['role'] == 'admin'){
                    $resultsClean[] = $resultsDirty[$key];
                }
            }

            return $resultsClean;
        }
    }