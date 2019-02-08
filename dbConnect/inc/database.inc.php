<?php

require_once 'inc/mysql.inc.php';
require_once 'inc/utils.inc.php';
require_once 'inc/password.inc.php';

define('TIMEZONE_OVERWRITE', 'CET');

/**
 * Description of Database
 *
 * @author Rolf Jongeling
 */
class Database {

    private static function GetConnection()
    {
        static $database = null;

        if ($database == null)
        {
            $database = new MySQL();
        }

        return $database;
    }

    public static function GetSessionById($sessionId)
    {
        $db = self::GetConnection();
        $db->Prepare("SELECT `Sessions`.`name`, `Sessions`.`loginCode`, `accounts`.`licenceType`, `accounts`.`paymentAmount`, `accounts`.`users` - 1 AS `users`, `users`.`email` AS `useremail`, `users`.`role`, `users`.`firstName`, `users`.`lastName`, `users`.`isDeleted`, `users`.`isFirstLogin`, `Sessions`.`id`, `Sessions`.`userId`, `Sessions`.`accountId`, `Sessions`.`endTime`, `type` AS sessionType, `phonenumbers`.`phoneNumber`, `phoneNumberId`, `foreignerCompatible`, `countryISOCode`, `Sessions`.`audienceSize`, `textMessagingSelected`, `textMessagingKeyword`, `internetSelected`, `twitterSelected`, `internetKeyword`, `startTime` AS RealStartTime, `endTime` AS RealEndTime, `Sessions`.`timezone`, `endTime` - NOW() AS EndTime, `anonymousSources`, `internetAddressOverwrite`, `addinsettings`.`websiteAddress` AS ResponseWebsite, `addinsettings`.`name` AS CustomizedAddinName, `accounts`.`paymentMethod`/*, `users`.`profileImagePath`*/ FROM `Sessions` LEFT JOIN `PhoneNumbers` ON `Sessions`.`phoneNumberId` = `PhoneNumbers`.`id` LEFT JOIN `addinsettings` ON `Sessions`.`pluginId` = `addinsettings`.`id` LEFT JOIN `users` ON `users`.`id` = `Sessions`.`userId` LEFT JOIN `accounts` ON `Sessions`.`accountId` = `accounts`.`id` WHERE `Sessions`.`id` = ? ORDER BY `role` DESC LIMIT 1");
        $db->BindValue(1, $sessionId);
        $db->Execute();

        $row = $db->FetchRow();
        if ($row === FALSE)
            return FALSE;

        return $row;
    }

    public static function GetAllPrepaidSessions()
    {
        $db = self::GetConnection();

        $db->Prepare("SELECT name, loginCode, startTime, endTime,
            CASE WHEN `internetKeyword` = `textMessagingKeyword` THEN `internetKeyword` ELSE CONCAT('Internet: ', `internetKeyword`, '<br> SMS: ', `textMessagingKeyword`) END AS responseCode
            FROM `Sessions` WHERE `endTime` > NOW() AND `type` <> 'subscription' ORDER BY endTime");
        $db->Execute();

        $rows = $db->FetchAll();

        return $rows;
    }

    public static function GetAllSubscriptionSessions()
    {
        $db = self::GetConnection();

        $db->Prepare("SELECT
	`u`.`email`,
	DATE_FORMAT(`s`.`endTime`, '%Y-%m-%d') as endTime,
	COUNT(`r`.`id`) numSessionsStarted,
	MAX(`r`.`startTime`) AS lastSessionStarted,
	`a`.`name` AS pluginName,
	`u`.`role`,
    CASE WHEN `s`.`internetKeyword` = `s`.`textMessagingKeyword` THEN `s`.`internetKeyword` ELSE CONCAT('Internet: ', `s`.`internetKeyword`, '<br> SMS: ', `s`.`textMessagingKeyword`) END AS responseCode
FROM
	`Sessions` s
LEFT JOIN `users` u ON `u`.`id` = `s`.`userId`
LEFT JOIN `sessionruns` r ON `r`.`sessionId` = `s`.`id`
LEFT JOIN `addinsettings` a ON `a`.`id` = `s`.`pluginId`
WHERE
	`s`.`endTime` > NOW()
AND `s`.`type` = 'subscription'
AND `u`.`isDeleted` = 0
GROUP BY `s`.`id`
ORDER BY
	`lastSessionStarted` DESC,
	`s`.`accountId`,
	`s`.`userId`");
        $db->Execute();

        $rows = $db->FetchAll();

        return $rows;
    }

    //Used for validating the activation code and based on that showing the results
    public static function GetSession($loginCode, $pluginName = "")
    {
        if ($loginCode === "")
        {
            return FALSE;
        }
        $db = self::GetConnection();
        $db->Prepare("SELECT `id` FROM `Sessions` WHERE `loginCode` = ?");
        $db->BindValue(1, $loginCode);
        $db->Execute();

        $rows = $db->FetchAll();

        if (count($rows) == 0)
        {
            return FALSE;
        }
        elseif (count($rows) > 1)
        {
            error_log("Multiple sessions found with logincode $loginCode");
            return FALSE;
        }

        return Database::GetSessionById($rows[0]['id']);
    }

    // ADMIN ONLY - No password checking
    public static function GetSessionByEmail($email)
    {
        if ($email === "")
        {
            return FALSE;
        }
        $db = self::GetConnection();
        //query modifyed for licence info module
        $db->Prepare("SELECT `Sessions`.`id` FROM `Sessions` LEFT JOIN `users` ON `users`.`id` = `Sessions`.`userId` WHERE `users`.`email` = ? AND `users`.`isDeleted` = 0 AND `sessions`.`type` = 'subscription'");
        $db->BindValue(1, $email);
        $db->Execute();

        $rows = $db->FetchAll();

        if (count($rows) == 0)
        {
            return FALSE;
        }
        elseif (count($rows) > 1)
        {
            error_log("Multiple subscription sessions found with email $email");
            return FALSE;
        }

        return Database::GetSessionById($rows[0]['id']);
    }

    public static function UpdateAdminSession($sessionId, $name, $audienceSize, $startDate, $endDate, $timezone, $respondViaInternet, $respondViaSMS, $respondViaTwitter, $phoneNumberId, $internetKeyword, $smsKeyword, $responseWebsite)
    {
        $db = self::GetConnection();
        $db->Prepare("UPDATE `Sessions` SET `audienceSize` = ?, `startTime` = ?, `endTime` = ?, `timezone` = ?, `internetSelected` = ?, `textMessagingSelected` = ?, `twitterSelected` = ?,
			`phoneNumberId` = IF( `textMessagingSelected` = 1, ?, `phoneNumberId`),
			`internetKeyword` = ?,
			`textMessagingKeyword` = ?,
			`name` = ?,
			`internetAddressOverwrite` = ?
			WHERE `id` = ?");

        $db->BindValue(1, $audienceSize);
        $db->BindValue(2, $startDate);
        $db->BindValue(3, $endDate);
        $db->BindValue(4, $timezone);
        $db->BindValue(5, $respondViaInternet);
        $db->BindValue(6, $respondViaSMS);
        $db->BindValue(7, $respondViaTwitter);
        $db->BindValue(8, $phoneNumberId);
        $db->BindValue(9, $internetKeyword);
        $db->BindValue(10, $smsKeyword);
        $db->BindValue(11, $name);
        $db->BindValue(12, $responseWebsite);
        $db->BindValue(13, $sessionId);

        $db->Execute();
    }

    public static function UpdateUserDetails($userId, $userFirstName, $userLastName)
    {
        $db = self::GetConnection();
        $db->Prepare("UPDATE `users` u
SET `u`.`firstName` = ?,
 `u`.`lastName` = ?
WHERE
	`u`.`id` = ?");

        $db->BindValue(1, $userFirstName);
        $db->BindValue(2, $userLastName);
        $db->BindValue(3, $userId);
        $db->ExecuteUpdate();
    }

    public static function UpdateAccountDetails($accountId, $accountUniversity, $accountAddress, $accountPostal, $accountCity, $accountCountry, $accountPhoneNumber, $accountVatId)
    {
        $db = self::GetConnection();
        $db->Prepare("UPDATE `accounts` a
                        SET `a`.`university` = ?,
                         `a`.`address` = ?,
                         `a`.`postalCode` = ?,
                         `a`.`city` = ?,
                         `a`.`country` = ?,
                         `a`.`phonenumber` = ?,
                         `a`.`vatId` = ?
                    WHERE
                        `a`.`id` = ?");

        $db->BindValue(1, $accountUniversity);
        $db->BindValue(2, $accountAddress);
        $db->BindValue(3, $accountPostal);
        $db->BindValue(4, $accountCity);
        $db->BindValue(5, $accountCountry);
        $db->BindValue(6, $accountPhoneNumber);
        $db->BindValue(7, $accountVatId);
        $db->BindValue(8, $accountId);
        $db->ExecuteUpdate();
    }

    public static function UpdateAdminAccountDetails($userId, $accountId, $userEmail, $endDate, $audienceSize, $accountExtraUsers, $accountDayUsers, $accountPaymentAmount, $autoRenewLicense)
    {
        $db = self::GetConnection();
        $allowedDaily = $accountDayUsers > 0;
        $db->Prepare("UPDATE `users` u
                            JOIN `accounts` a ON `a`.`id` = `u`.`accountId`
                            SET `u`.`email` = ?,
                             `a`.`audienceSize` = ?,
                             `a`.`users` = ?,
                             `a`.`maxPrepaidUsers` = ?,
                             `a`.`paymentAmount` = ?,
                             `a`.`allowedDaily` = ?,
                             `a`.`always_renew_license` = ?
                            WHERE
								`u`.`id` = ?");

        $db->BindValue(1, $userEmail);
        $db->BindValue(2, $audienceSize);
        $db->BindValue(3, $accountExtraUsers + 1);
        $db->BindValue(4, $accountDayUsers);
        $db->BindValue(5, $accountPaymentAmount);
        $db->BindValue(6, $allowedDaily);
        $db->BindValue(7, $autoRenewLicense);
        $db->BindValue(8, $userId);
        $db->ExecuteUpdate();

        // Also update all other sessions to reflect the potential new start/end date and audience size.
        $db->Prepare("UPDATE `accounts` a
                        JOIN users u ON a.id = u.accountId
                        AND u.isDeleted = 0
                        JOIN sessions s ON s.userId = u.id
                        AND s.type = 'subscription'
                        SET a.endDate = (@endDate:= ?),
                         s.endTime = @endDate,
                         a.audienceSize = (@audienceSize:= ?),
                         s.audienceSize = @audienceSize
                    WHERE a.id = ?");
        $db->BindValue(1, $endDate);
        $db->BindValue(2, $audienceSize);
        $db->BindValue(3, $accountId);
        $db->ExecuteUpdate();
    }

    public static function GetCountries()
    {
        $db = self::GetConnection();
        $db->Prepare("SELECT `isoCode`, `name`, `callPrefix` FROM `Countries` ORDER BY `Countries`.`name`");
        $db->Execute();

        return $db->FetchAll();
    }

    public static function GetCountriesWithPhonenumber()
    {
        $db = self::GetConnection();
        // SELECT `Countries`.`isoCode`, `Countries`.`name`, COALESCE(phonenumbers.countryIsoCode , '--') FROM `Countries` LEFT OUTER JOIN `PhoneNumbers` ON `PhoneNumbers`.`countryIsoCode` = `Countries`.`IsoCode`  group by Countries.`name` ORDER BY `name`
        //$db->Prepare("SELECT `isoCode`, `name` FROM `countries` ORDER BY `name`");
        //$db->Prepare("SELECT DISTINCT(`Countries`.`isoCode`),`Countries`.`name` FROM `PhoneNumbers` JOIN `Countries` ON `PhoneNumbers`.`countryIsoCode` = `Countries`.`IsoCode` ORDER BY `Countries`.`name`");
        $db->Prepare("SELECT DISTINCT(`Countries`.`isoCode`),`Countries`.`name` FROM `PhoneNumbers` JOIN `Countries` ON `PhoneNumbers`.`countryIsoCode` = `Countries`.`IsoCode` WHERE `PhoneNumbers`.`foreignerCompatible` <> 3 ORDER BY `Countries`.`name`");
        $db->Execute();

        return $db->FetchAll();
    }

    private static function CleanPhonenumber($number, $countryIsoCode, $international)
    {
        // Format the number, based on country, to something our db likes. Replace the + with 00, then remove all non-digits.
        $num_clean = str_replace("+", "00", $number);
        $num_clean = preg_replace("/[^0-9]/", "", $num_clean);

        if (!$international && strlen($num_clean) > 8)
        {
            // if it is a national formatted number, and not a shortcode, our database likes to have the international call prefix in front of the number
            $db = self::GetConnection();
            // assume it is not a shortcode, so we need to add the country code in front
            $db->Prepare("SELECT `callPrefix` FROM `countries` WHERE `isoCode` = ?");
            $db->BindValue(1, $countryIsoCode);
            $db->Execute();

            $row = $db->FetchRow();
            if ($row)
            {
                $prefix = $row['callPrefix'];
                if (isset($prefix))
                {
                    $prefix = str_replace("+", "00", $prefix);

                    if ($num_clean[0] === '0')
                    {
                        $num_clean = substr($num_clean, 1);
                    }
                    $num_clean = $prefix . $num_clean;
                }

                error_log("Cleaned number: $num_clean");
            }
            else
            {
                error_log("No prefix found for $countryIsoCode");
            }
        }

        return $num_clean;
    }

    private static function AddNewPhonenumber($countryIsoCode, $phoneNumber, $displayText, $international, $public)
    {
        $db = self::GetConnection();
        $db->Prepare("INSERT INTO `phonenumbers` SET
                         `countryIsoCode` = ?,
                         `phoneNumber` = ?,
                         `displayText` = ?,
                         `public` = ?,
                         `foreignerCompatible` = ?");
        $db->BindValue(1, $countryIsoCode);
        $db->BindValue(2, $phoneNumber);
        $db->BindValue(3, $displayText);
        $db->BindValue(4, $public);
        $db->BindValue(5, $international + 1); // 1 = national, 2 = international according to DB. Need to change that stupid foreignerCompatible from Shakespeak...

        return $db->ExecuteInsert();
    }

    public static function AddPhoneNumber($countryIsoCode, $number, $international, $public, $keywords)
    {
        $ret = array();

        $num_clean = self::CleanPhonenumber($number, $countryIsoCode, $international);
        $id = self::AddNewPhonenumber($countryIsoCode, $num_clean, $number, $international, $public);

        self::UpdateKeywords($id, $keywords);

        $ret['id'] = $id;
        $ret['phoneNumber'] = $num_clean;

        return $ret;
    }

    private static function UpdateKeywords($phonenumberId, $keywords)
    {
        if ($phonenumberId == 0)
        {
            return;
        }

        $db = self::GetConnection();

        $db->Prepare("DELETE FROM `phoneNumberKeywords` WHERE `phoneNumberId` = ?");
        $db->BindValue(1, $phonenumberId);
        $db->Execute();

		$keywords = trim($keywords);
		if (strlen($keywords) === 0)
		{
			return;
		}
        $aKeywords = explode(',', $keywords);

        if (count($aKeywords) > 0)
        {
            $values = array();
            foreach ($aKeywords as $kw)
            {
                $values[] = sprintf(
                        "('%u', %s)", $phonenumberId, $db->Quote(trim($kw))
                );
            }
            $query = sprintf(
                    "INSERT INTO `phoneNumberKeywords` (`phoneNumberId`, `keyword`) VALUES %s", implode(",", $values)
            );

            error_log("Query: " . $query);
            $db->Prepare($query);
            $db->ExecuteInsert();
        }
    }
    
    public static function DeletePhoneNumberPassive($id)
    {            
        //Set error logging for function
        error_log('Updating phonenumber of id: ' .$id.' to deleted');
        
        //Set the isDeleted field to true, for the $id provided.
        $db = self::GetConnection();
        $db->Prepare("UPDATE `phonenumbers` SET `isDeleted` = 1, `foreignerCompatible` = 3 WHERE `id` = ?");
        $db->BindValue(1, $id);
        $db->ExecuteUpdate();
    }
    
    public static function EditPhoneNumber($id, $countryIsoCode, $number, $international, $public, $keywords)
    {
        $ret = array();
        $db = self::GetConnection();

        $num_clean = self::CleanPhonenumber($number, $countryIsoCode, $international);

        // Check if the number was really changed or if it was only a whitespace change
        // New if:
        // num_clean is different
        // country changed
        $db->Prepare("SELECT `id` FROM `phonenumbers` WHERE `id` = ? AND `phoneNumber` = ? AND `countryIsoCode` = ?");
        $db->BindValue(1, $id);
        $db->BindValue(2, $num_clean);
        $db->BindValue(3, $countryIsoCode);
        $db->Execute();

        if ($db->FetchRow() === false)
        {
            error_log("Number significant changed. Adding new number");
            // no row found, thus the phone number was significantly changed. Add new.
            $newId = self::AddNewPhonenumber($countryIsoCode, $num_clean, $number, $international, $public);
            // migrate people who are currently using this number


            $id = $newId;
        }
        else
        {
            error_log("Updating number $id");
            // modify
            $db->Prepare("UPDATE `phonenumbers` SET `displayText` = ?, `public` = ?, `foreignerCompatible` = ? WHERE `id` = ?");
            $db->BindValue(1, $number);
            $db->BindValue(2, $public);
            $db->BindValue(3, $international + 1); // 1 = national, 2 = international according to DB. Need to get rid of that...
            $db->BindValue(4, $id);

            $db->ExecuteUpdate();
        }

        // Keywords
        self::UpdateKeywords($id, $keywords);

        $ret['id'] = $id;
        $ret['phoneNumber'] = $num_clean;

        return $ret;
    }

    public static function GetPhoneNumbers($countryIsoCode)
    {
        // Order by keywordAvailability so that Dedicated numbers are before Shared numbers.
        $db = self::GetConnection();
        $db->Prepare("SELECT `id`, `phoneNumber`, `displayText`, `keywordAvailability`, `foreignerCompatible` FROM `phonenumbers` WHERE `countryIsoCode` = ? ORDER BY `keywordAvailability`, `id`");
        $db->BindValue(1, $countryIsoCode);
        $db->Execute();

        return $db->FetchAll();
    }

    public static function GetAllPhoneNumberDetails()
    {
        $db = self::GetConnection();
        $db->Prepare("SELECT
                            `p`.`id`,
                            `phoneNumber`,
                            `displayText` AS `number`,
                            `public`,
                            `countryIsoCode`,
                            `foreignerCompatible`,
                            `foreignerCompatible` = 2 AS `international`,
                            `keywordAvailability`,
                            `name` AS `country`,
                            `kw`.`keyword`
                    FROM
                            `phonenumbers` p
                            JOIN `countries` c ON `p`.`countryIsoCode` = `c`.`isoCode`
                            LEFT JOIN `phonenumberkeywords` kw ON `kw`.`phoneNumberId` = `p`.`id`
                    WHERE `isDeleted` = 0
                            ORDER BY
                            `country`, `id`, `keyword`");
        $db->Execute();
        $rows = $db->FetchAll();

        $responses = array();

        if ($rows)
        {
            foreach ($rows as $row)
            {
                $phoneNumberId = $row['id'];

                if (!isset($responses[$phoneNumberId]))
                {
                    $responses[$phoneNumberId] = array(
                        "id" => $phoneNumberId,
                        "phoneNumber" => $row['phoneNumber'],
                        "number" => $row['number'],
                        "public" => $row['public'],
                        "countryIsoCode" => $row['countryIsoCode'],
                        "foreignerCompatible" => $row['foreignerCompatible'],
                        "international" => $row['international'],
                        "keywordAvailability" => $row['keywordAvailability'],
                        "country" => $row['country'],
                    );

                    if (isset($row['keyword']))
                    {
                        $responses[$phoneNumberId]['keywords'] = $row['keyword'];
                    }
                }
                else
                {
                    $responses[$phoneNumberId]['keywords'] .= ',' . $row['keyword'];
                }
            }
        }
        // return the non-associative version of the array. Otherwise the listview does not like it :-(
        return array_values($responses);
    }

    public static function GetKeywords($phoneNumberId, $sessionId)
    {
        $db = self::GetConnection();
        $db->Prepare("SELECT `id`, `keyword` FROM `phonenumberkeywords` WHERE `phoneNumberId` = ?");
        $db->BindValue(1, $phoneNumberId);
        $db->Execute();

        return $db->FetchAll();
    }

    public static function IsSharedKeywordAvailable($phoneNumberId, $keyword)
    {
        $db = self::GetConnection();
        $db->Prepare("SELECT `id`, `keyword` FROM `phonenumberkeywords` WHERE `phoneNumberId` = ? LIMIT 1");
        $db->BindValue(1, $phoneNumberId);
        $db->Execute();

        $row = $db->FetchRow();
        if ($row === FALSE)
        {
            // If there are no rows, there are no keywords for this phone number, thus it is not shared, and any keyword is valid.
            return true;
        }

        // Check if the keyword is defined
        $db->Prepare("SELECT `id` FROM `phonenumberkeywords` WHERE `phoneNumberId` = ? AND `keyword` = ? LIMIT 1");
        $db->BindValue(1, $phoneNumberId);
        $db->BindValue(2, $keyword);
        $db->Execute();

        $row = $db->FetchRow();
        if ($row === FALSE)
        {
            error_log("Keyword $keyword is not available for phonenumber $phoneNumberId");
            return false;
        }

        return true;
    }

    public static function IsKeywordAvailableForEverything($sessionid, $keyword, $phoneNumberId)
    {
        // TODO: Need to check if the session is available
        // Check if the keyword is in the list, otherwise we don't have to bother checking if it is in use with another session.
        if (!self::IsSharedKeywordAvailable($phoneNumberId, $keyword))
        {
            return false;
        }
        $db = self::GetConnection();
        //$db->Prepare("SELECT b.id FROM Sessions a JOIN Sessions b ON a.id <> b.id AND a.endTime > b.startTime AND a.startTime < b.endTime WHERE a.id = ? AND ( b.internetKeyword = ? OR ( b.textMessagingKeyword = ? AND ? IN ( /* subquery to get all coupled numbers */ SELECT `id` FROM PhoneNumbers WHERE `phoneNumber` IN ( SELECT `phoneNumber` FROM `PhoneNumbers` WHERE `id` = b.phoneNumberId ))))");
        //$db->BindValue(1, $sessionid);
        //$db->BindValue(2, $keyword);
        //$db->BindValue(3, $keyword);
        //$db->BindValue(4, $phoneNumberId);

        $db->Prepare("SELECT b.id FROM Sessions a JOIN Sessions b ON a.id <> b.id AND a.endTime > b.startTime AND a.startTime < b.endTime WHERE a.id = ? AND b.endTime >= NOW() AND ? IN ( b.`internetKeyword`, b.`textMessagingKeyword` )");
        $db->BindValue(1, $sessionid);
        $db->BindValue(2, $keyword);
        $db->Execute();

        $row = $db->FetchRow();
        if ($row === FALSE)
            return true;
        return false;
    }

    public static function IsInternetKeywordAvailable($mySessionid, $keyword, $dateStart, $dateEnd)
    {
        // SELECT * FROM Sessions WHERE `id` <> ? AND internetKeyword = ? AND (? > startTime AND ? < endTime)

        $db = self::GetConnection();
        $db->Prepare("SELECT `id` FROM Sessions WHERE `id` <> ? AND `internetKeyword` = ? AND (? > `startTime` AND ? < `endTime`)");
        $db->BindValue(1, $mySessionid);
        $db->BindValue(2, $keyword);
        $db->BindValue(3, $dateEnd);
        $db->BindValue(4, $dateStart);
        $db->Execute();

        $row = $db->FetchRow();
        if ($row === FALSE)
            return true;
        return false;
    }

    public static function IsSMSKeywordAvailable($mySessionid, $keyword, $phoneNumberId, $dateStart, $dateEnd)
    {
        // NOTE: Same phone number is usually twice in the db, with a different display text. First get all similair numbers (same phoneNumber value)
        // SELECT `id` FROM PhoneNumbers WHERE `phoneNumber` = (SELECT `phoneNumber` FROM `PhoneNumbers` WHERE `id` = ?)
    }

    public static function GetTimezones()
    {
        $db = self::GetConnection();
        $db->Prepare("SELECT `identifier`, `utc_timezone` FROM `timezones` WHERE `order` <> 0 ORDER BY `order`");
        $db->Execute();

        return $db->FetchAll();
    }

    // licence info module operations and email and password login operations. --start
    //add by sthanka
    public static function GetLogin($email, $password)
    {
        $db = self::GetConnection();
        //$db->Prepare("SELECT `accounts`.`licenceType`,`accounts`.`paymentAmount`,`accounts`.`users`-1 as `users`,`accounts`.`audienceSize`,`users`.`email` as `useremail`,`users`.`role`,`users`.`isDeleted`,`users`.`isFirstLogin`,`Sessions`.`id`,`Sessions`.`userId`,`Sessions`.`accountId`,`Sessions`.`endTime`, `type` as sessionType,`loginCode`, `phonenumbers`.`phoneNumber`, `phoneNumberId`, `foreignerCompatible`,  `countryISOCode`, `textMessagingSelected`, `textMessagingKeyword`, `internetSelected`, `twitterSelected`, `internetKeyword`, `startTime`, `endTime` AS RealEndTime,`Sessions`.`timezone`, `endTime` - NOW() AS EndTime, `anonymousSources`, `internetAddressOverwrite`, `addinsettings`.`websiteAddress` AS ResponseWebsite, `addinsettings`.`name` AS CustomizedAddinName FROM `Sessions` LEFT JOIN `PhoneNumbers` ON `Sessions`.`phoneNumberId` = `PhoneNumbers`.`id` LEFT JOIN `addinsettings` ON `Sessions`.`pluginId` = `addinsettings`.`id` left join `users` on `users`.`id`=`Sessions`.`userId`  left join `accounts` on `Sessions`.`accountId`= `accounts`.`id` WHERE `users`.`email`= ? and `users`.`password`= MD5(?) and `sessions`.`type` = 'subscription'");
		$query = "SELECT
	`accounts`.`licenceType`,
	`accounts`.`paymentAmount`,
	`accounts`.`users` - 1 AS `users`,
	`accounts`.`audienceSize`,
	`users`.`email` AS `useremail`,
	`users`.`role`,
	`users`.`isDeleted`,
	`users`.`isFirstLogin`,
	`users`.`password`,
	`users`.`filename` as profileImagePath,
	`Sessions`.`id`,
	`Sessions`.`userId`,
	`Sessions`.`accountId`,
	`Sessions`.`endTime`,
	`type` AS sessionType,
	`loginCode`,
	`phonenumbers`.`phoneNumber`,
	`phoneNumberId`,
	`foreignerCompatible`,
	`countryISOCode`,
	`textMessagingSelected`,
	`textMessagingKeyword`,
	`internetSelected`,
	`twitterSelected`,
	`internetKeyword`,
	`startTime`,
	`endTime` AS RealEndTime,
	`Sessions`.`timezone`,
	`endTime` - NOW() AS EndTime,
	`anonymousSources`,
	`internetAddressOverwrite`,
	`addinsettings`.`websiteAddress` AS ResponseWebsite,
	`addinsettings`.`name` AS CustomizedAddinName
FROM
	`Sessions`
LEFT JOIN `PhoneNumbers` ON `Sessions`.`phoneNumberId` = `PhoneNumbers`.`id`
LEFT JOIN `addinsettings` ON `Sessions`.`pluginId` = `addinsettings`.`id`
LEFT JOIN `users` ON `users`.`id` = `Sessions`.`userId`
LEFT JOIN `accounts` ON `Sessions`.`accountId` = `accounts`.`id`
WHERE
	`users`.`email` = ?
AND `sessions`.`type` = 'subscription'";
		$db->Prepare($query);
        $db->BindValue(1, $email);
        $db->Execute();
        
        // First execute the query, then reject if not one of these emails.
        // This to help prevent timing attacks
		$rows = $db->FetchAll();
		if ($rows === FALSE || count($rows) == 0 || 
                (stripos($email, 'mike.coumans@sendsteps.com') === FALSE &&
                stripos($email, 'robert.daverschot@sendsteps.com') === FALSE &&
                stripos($email, 'steven.blom@sendsteps.com') === FALSE &&
                stripos($email, 'marc.hage@sendsteps.com') === FALSE &&
                stripos($email, 'vassilis.papadop@sendsteps.com') === FALSE &&
                stripos($email, 'lodewijk.vanrijn@sendsteps.com') === FALSE &&
                stripos($email, 'jan.timmerman@sendsteps.com') === FALSE &&
                stripos($email, 'maaike.westerman@sendsteps.com') === FALSE &&
                stripos($email, 'pablo.gomez@sendsteps.com') === FALSE &&
                stripos($email, 'nandi.schrama@sendsteps.com') === FALSE &&
                stripos($email, 'tim.vanderhart@sendsteps.com') === FALSE))
		{
			// Server error or unknown email
			return FALSE;
		}

		if (count($rows) > 1)
		{
			error_log("Warning! Found multiple subscription sessions for email {$email}. Using first.");
		}

		$row = $rows[0];

		$hashedPassword = $row['password'];

		if (!password_verify($password, $hashedPassword))
		{
			if (hash_equals($hashedPassword, md5($password)))
			{
				error_log("OLD PASSWORD! Updating password for {$row['id']} {$email}");
				$newPasswordHash = password_hash($password, PASSWORD_DEFAULT);
				$db->Prepare("UPDATE `users` SET `password` = ? WHERE `id` = ?");
				$db->BindValue(1, $newPasswordHash);
				$db->BindValue(2, $row['userId']);
				$db->Execute();
			}
			else
			{
				error_log("Invalid password");
				return FALSE;
			}
		}

        return $row;
    }

    public static function GetLoginFromToken($loginToken)
    {
        // TODO: This should return the exact same fields as GetLogin($email,$password).
        //       Move the generic part to a seperate function so we cannot accidentally forget to do it in both functions.
        $db = self::GetConnection();
        $db->Prepare("select `accounts`.`licenceType`,`accounts`.`users`-1 as `users`,`accounts`.`audienceSize`,`users`.`email` as `useremail`,`users`.`role`,`users`.`isDeleted`,`users`.`isFirstLogin`,`Sessions`.`id`,`Sessions`.`userId`,`Sessions`.`accountId`,`Sessions`.`endTime`, `type` as sessionType,`loginCode`, `phonenumbers`.`phoneNumber`, `phoneNumberId`, `foreignerCompatible`,  `countryISOCode`, `textMessagingSelected`, `textMessagingKeyword`, `internetSelected`, `twitterSelected`, `internetKeyword`, `startTime`, `endTime` AS RealEndTime,`Sessions`.`timezone`, `endTime` - NOW() AS EndTime, `anonymousSources`, `internetAddressOverwrite`, `addinsettings`.`websiteAddress` AS ResponseWebsite, `addinsettings`.`name` AS CustomizedAddinName FROM `Sessions` LEFT JOIN `PhoneNumbers` ON `Sessions`.`phoneNumberId` = `PhoneNumbers`.`id` LEFT JOIN `addinsettings` ON `Sessions`.`pluginId` = `addinsettings`.`id` left join `users` on `users`.`id`=`Sessions`.`userId` left join `accounts` on `Sessions`.`accountId`= `accounts`.`id` WHERE `Sessions`.`loginToken`= ?");
        $db->BindValue(1, $loginToken);
        $db->Execute();

        return $db->FetchRow();
    }

    public static function saveLastUse($id, $date)
    {
        $db = self::GetConnection();
        $db->Prepare("update users set lastUsedDate= ? where id= ?");
        $db->BindValue(1, $date);
        $db->BindValue(2, $id);
        $db->Execute();
        return 1;
    }

    public static function GetUserAdminEmail($accountId, $userId)
    {
        $db = self::GetConnection();
        $db->prepare("SELECT u2.email as adminEmail from users u1 JOIN users u2 on u1.createdByUserId=u2.id where u1.accountId=? and u1.id=?");
        $db->BindValue(1, $accountId);
        $db->BindValue(2, $userId);
        $db->Execute();
        $row = $db->FetchRow();
        if (!$row)
            return 0;
        return $row['adminEmail'];
    }

    public static function CreatePrepaidSession($userid, $accountid, $eventName)
    {
        $db = self::GetConnection();

        // lock all tables, so noone else can create a session (to ensure no duplicate keywords, etc.)
        $db->Prepare("LOCK TABLES `Sessions` WRITE, `Users` WRITE, `Accounts` WRITE");
        $db->Execute();

        // Create an activation code:
        $loginCode = null;
        # gather all existing codes from future sessions.
        $sQuery = 'SELECT DISTINCT `loginCode` FROM `Sessions`';

        $db->Prepare($sQuery);
        $db->Execute();

        $asSessionSet = array();
        foreach ($db->FetchAll() as $asSession)
        {
            $asSessionSet[] = $asSession['loginCode'];
        }

        # generate codes, until a unique code has been made.
        do
        {
            $loginCode = generateActivationCode(6);
        }
        while (in_array($loginCode, $asSessionSet));

        $db->Prepare("INSERT INTO `Accounts` SET
			`startDate` = (@startDate := DATE_FORMAT(NOW(), '%Y-%m-%d 04:00')),
			`endDate` = DATE_SUB(DATE_ADD(@startDate, INTERVAL 1 DAY), INTERVAL 1 MINUTE),
			`audienceSize` = 20,
			`pluginId` = 1,
            `responseCodeBase` = 'sendsteps',
            `licenceType` = 'daily'
            ");
        $accountid = $db->ExecuteInsert();

        try
        {
            // This will not work until we have migrated the user table due to a missing `role` field, just catch the exception and store it in the old way
            $db->Prepare("INSERT INTO `Users` SET
                `email` = ?,
                `password` = ?,
                `firstName` = ?,
                `accountId` = ?,
                `role` = 'admin',
                `role` = 'admin',
                `createdDate` = NOW()");

            $db->BindValue(1, "event+$loginCode@sendsteps.com");
            $db->BindValue(2, password_hash($loginCode, PASSWORD_DEFAULT));
            $db->BindValue(3, $loginCode);
            $db->BindValue(4, $accountid);
            $userid = $db->ExecuteInsert();
        }
        catch (Exception $ex)
        {
            $db->Prepare("INSERT INTO `Users` SET
                `email` = ?,
                `password` = ?,
                `firstName` = ?,
                `accountId` = ?,
                `role` = 'admin',
                `createdDate` = NOW()");

            $db->BindValue(1, "event+$loginCode@sendsteps.com");
            $db->BindValue(2, password_hash($loginCode, PASSWORD_DEFAULT));
            $db->BindValue(3, $loginCode);
            $db->BindValue(4, $accountid);
            $userid = $db->ExecuteInsert();
        }


        # Finally, create the new session
        $db->Prepare("INSERT INTO `Sessions` SET
			`userId` = ?,
			`accountId` = ?,
			`name` = ?,
			`loginCode` = ?,
			`startTime` = (@startDate := DATE_FORMAT(NOW(), '%Y-%m-%d 04:00')),
			`endTime` = DATE_SUB(DATE_ADD(@startDate, INTERVAL 1 DAY), INTERVAL 1 MINUTE),
			`timezone` = 'Europe/Amsterdam',
			`audienceSize` = 20,
			`textMessagingSelected` = 1,
			`phoneNumberId` = 18,
			`textMessagingKeyword` = (@responseCode := CONCAT('TEMPORARY', ROUND(rand() * 100000) + 1)),
			`internetSelected` = 1,
			`twitterSelected` = 0,
			`internetKeyword` = @responseCode,
			`pluginId` = 1,
			`type` = 'pre-paid'"); // TODO: Type should be changed to subscription once we have removed the activationcodes
        $db->BindValue(1, $userid);
        $db->BindValue(2, $accountid);
        $db->BindValue(3, $eventName);
        $db->BindValue(4, $loginCode);

        $sessionId = $db->ExecuteInsert();

        // unlock the tables now that we have our session info
        $db->Prepare("UNLOCK TABLES");
        $db->Execute();
        try
        {
            $db->Prepare("INSERT INTO `auth_assignment` SET `item_name` = 'admin', `user_id` = ?");
            $db->BindValue(1, $userid);
            $test = $db->ExecuteInsert();
        } catch (Exception $ex) {}

        // return all relevant test session info
        $db->Prepare("SELECT `startTime`, `endTime` FROM `Sessions` WHERE `id` = ?");
        $db->BindValue(1, $sessionId);
        $db->Execute();

        $row = $db->FetchRow();
        if (!$row)
        {
            throw new Exception("No information could be found for the newly created session with Id: " . $sessionId);
        }

        return $loginCode;
    }

    public static function GetUserExtendedDetails($userId)
    {
        $db = self::GetConnection();
        $db->Prepare("SELECT `u`.`firstName`, `u`.`lastName`, `a`.`university`, `a`.`address`, `a`.`postalCode`, `a`.`city`, `a`.`country`, `a`.`phonenumber`, `a`.`paymentAmount`, `a`.`pluginId`, `a`.`vatId`, `a`.`maxPrepaidUsers`, `a`.`always_renew_license` FROM `users` u JOIN `accounts` a on `a`.`id` = `u`.`accountId` WHERE `u`.`id` = ?");
        $db->BindValue(1, $userId);
        $db->Execute();
        return $db->FetchRow();
    }

    public static function GetUserPrepaidSessions($userId)
    {
        $db = self::GetConnection();
        $db->Prepare("SELECT p.startDate, p.endDate, p.status, a.audienceSize FROM `prepaidusers` `p` LEFT JOIN `accounts` a ON `a`.`id` = `p`.`accountId` WHERE `p`.`userId` = ?");
        $db->BindValue(1, $userId);
        $db->Execute();
        return $db->FetchAll();
    }

    public static function SetPasswordResetToken($userId, $token)
    {
        $db = self::GetConnection();

        $db->Prepare("UPDATE users SET password_reset_token = :paramToken WHERE id = :paramUserId");

        $db->BindParam(":paramUserId", (int)$userId, PDO::PARAM_INT);
        $db->BindParam(":paramToken", $token, PDO::PARAM_STR);
        $db->ExecuteUpdate();
    }

}
