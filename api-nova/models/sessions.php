<?php 
require_once __DIR__.'/../../api-common/base/model.php';

class Sessions_Model extends Model {

    public function getSessionById($sessionId){
        $results = $this->findByIdCentral($sessionId, 'sessions');
        return $results;
    }
    
    public function getUserIdFromSessionId($sessionId){
        $query = 'SELECT u.id as sessionId FROM users u LEFT JOIN `sessions` s ON s.userId = u.id WHERE <s.id> = :sessionId AND isDeleted = 0 LIMIT 1;';
        $params['sessionId'] = (int) $sessionId;
        $results = $this->query($query, $params)[0];
        $return = (isset($results['sessionId']))? $results['sessionId'] : false;
        return $return;
    }
    
    public function getDetails($sessionId){
        $query = "SELECT
            users.id as user_id,
            accounts.id as account_id,
            `sessions`.id as session_id,
        
            `sessions`.loginCode as activationCode,
            DATE_FORMAT(accounts.startDate, '%Y-%m-%d') AS accStartDate,
            DATE_FORMAT(accounts.endDate, '%Y-%m-%d') AS accEndDate,
            accounts.timezone as accountTimezone,
            accounts.audienceSize as accAudienceSize,
            accounts.users - 1 AS extraAccounts,
            accounts.maxPrepaidUsers AS DayAccountsTotal,
            accounts.licenceType,
            
            accounts.phonenumber AS accountPhonenumber,
            accounts.address,
            accounts.postalCode,
            accounts.city,
            accounts.country AS accountCountry,
            accounts.university,
            
            `sessions`.internetKeyword AS responseCodeInternet,
            `sessions`.textMessagingKeyword AS responseCodeSMS,
            `sessions`.textMessagingSelected,
            `sessions`.internetSelected,
            
            accounts.paymentAmount,
            accounts.paymentMethod,
            DATE_FORMAT(users.createdDate, '%Y-%m-%d') AS startDate,
            users.email, users.id AS user_id, 
            users.email AS useremail,
            users.`role`,
            users.firstName,
            users.lastName,
            users.isDeleted,
            users.isFirstLogin,
            users.lastUsedDate,
            users.role AS userRole,
            `sessions`.id AS session_id,
            `sessions`.`name`,
            `sessions`.id,
            `sessions`.userId,
            `sessions`.accountId,
            `sessions`.endTime,
            `sessions`.audienceSize,
            `sessions`.timezone,
            `sessions`.internetAddressOverwrite as CustomResponseWebsite,
            DATE_FORMAT(`sessions`.endTime, '%Y-%m-%d') AS endTime, 
            COUNT(sessionruns.id) AS numSessionsStarted, 
            MAX(sessionruns.startTime) AS lastSessionStarted, 
            sessionruns.startTime AS RealStartTime,
            sessionruns.endTime AS RealEndTime,
            sessionruns.endTime - NOW() AS EndTime,
            addinsettings.name AS pluginName,
            addinsettings.websiteAddress AS ResponseWebsite,
            addinsettings.`name` AS CustomizedAddinName,
            `type` AS sessionType,
            phonenumbers.displayText as phoneNumber,
            phonenumbers.id as phoneNumberId,
            phonenumbers.countryISOCode,
            phonenumbers.foreignerCompatible,
            anonymousSources
        FROM `sessions`
        LEFT JOIN users ON users.id = `sessions`.userId 
        LEFT JOIN sessionruns ON sessionruns.sessionId = `sessions`.id 
        LEFT JOIN addinsettings ON addinsettings.id = `sessions`.pluginId
        LEFT JOIN phonenumbers ON `sessions`.phoneNumberId = phonenumbers.id
        LEFT JOIN accounts ON `sessions`.accountId = accounts.id
        WHERE 
            <sessions.id> = :sessionId AND
            -- `Sessions`.internetKeyword = `Sessions`.textMessagingKeyword AND 
            -- `Sessions`.endTime > NOW() AND 
            -- `Sessions`.`type` = 'subscription' AND 
            users.isDeleted = 0 
        GROUP BY `Sessions`.id ORDER BY users.email ASC";
        $params['sessionId'] = $sessionId;
        $results = $this->query($query, $params);
        return $results;
    }

    public function toggleAutoAccept($isEnabled, $sessionid) {
        $update = $this->database()->update(
            "sessions",
            ["autoApprove" => $isEnabled],
            ["id" => $sessionid]
        );
        return $update->execute();
    }

    public function toggleUpvoting($isEnabled, $sessionid) {
        $update = $this->database()->update(
            "sessions",
            ["hasUpvoting" => $isEnabled],
            ["id" => $sessionid]
        );
        return $update->execute();
    }
    
    public function checkUniqueResponseCode($responseCode, $userId) {
        $results = $this->database()->select('sessions', '*', ['internetKeyword' => $responseCode, 'textMessagingKeyword' => $responseCode, 'userId[!]' => $userId]);
        return count($results);
    }
    
    public function getOverview(){

        $query = "SELECT
                s.id AS `sessionId`,
                u.email,
                u.id as `user_id`,
                DATE_FORMAT(s.endTime, '%Y-%m-%d') AS endTime,
                COUNT(r.id) AS numSessionsStarted,
                MAX(r.startTime) AS lastSessionStarted,
                a.name AS pluginName,
                u.role AS userRole,
                s.internetKeyword as responseCode
            FROM
                `sessions` s
                LEFT JOIN users u ON u.id = s.userId
                LEFT JOIN sessionruns r ON r.sessionId = s.id
                LEFT JOIN addinsettings a ON a.id = s.pluginId
            WHERE
                u.isDeleted = 0
            GROUP BY s.id";
        $params = array();
        $results = $this->query($query, $params);
        return $results;
    }

    public function updateResponseSettings( $sessionId, ...$fields ) {
        $fields = $fields[0];
        $update = $this->database()->update(
            "sessions",
            [
                'internetAddressOverwrite' => $fields->internetaddressoverwrite, 
                'internetSelected' => $fields->internetselected, 
                'phonenumberId' => $fields->phonenumberId, 
                'textmessagingkeyword' => $fields->textmessagingkeyword,
                'internetKeyword' => $fields->textmessagingkeyword,
                'textmessagingselected' => $fields->textmessagingselected],
            ["id" => $sessionId]
        );
        return $update->execute();
    }

    public function getIdentificationType($sessionId) {
        $result = $this->database()->select(
            'sessions', 
            [
                'anonymousSources'
            ],
            [
                'id' => $sessionId
            ]);
        return $result;
    }

    public function setIdentificationType($isAnonymous, $sessionId) {
        $update = $this->database()->update(
            "sessions",
            [
                'anonymousSources' => $isAnonymous 
            ],
            ["id" => $sessionId]
        );
        return $update->execute();
    }

}