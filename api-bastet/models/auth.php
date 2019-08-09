<?php 
    require_once __DIR__.'/../../api-common/base/model.php';

    class Auth_Model extends Model {
        private $tokenLength = 250;
        
        public function createToken($username) {
            $tokenExists = true;
            //In the event we create a duplicate token, carry on looping until we create a unique one.            
            while ($tokenExists == true){
                if ($this->isPhp7()) {
                    $token = substr(bin2hex(random_bytes(255)), 0, $this->tokenLength);
                } else {
                    $token = substr( uniqid(("adasdagspagopofpopo"+time()), TRUE), 0, $this->tokenLength);
                }
                $findTokenSQL = "SELECT count(token) as res FROM `api_nova_tokens` WHERE <token> LIKE :token ;";
                $findTokenParams['token'] = $token;
                $tokenExists = ($this->query($findTokenSQL, $findTokenParams)[0]['res'] == 0)? false : true;
            }
            $getUserSQL = "SELECT id FROM users WHERE isDeleted != 1 AND <email> = :email;";
            $getUserParams['email'] = $username;
            $user_id = (int)  ($this->query($getUserSQL, $getUserParams)[0]['id']);
            $timestamp = time();
            
            $clearOldTokensSQL = "DELETE FROM `api_nova_tokens` WHERE <user_id> = :user_id;";
            $clearOldTokensParams['user_id'] = $user_id; 
            $this->query($clearOldTokensSQL, $clearOldTokensParams);
            
            $createNewTokenSQL = "INSERT INTO `api_nova_tokens` (<user_id>, <token>, <timestamp>) VALUES ( :user_id, :token, :timestamp );";
            $createNewTokenParams['token'] = $token; 
            $createNewTokenParams['user_id'] = $user_id; 
            $createNewTokenParams['timestamp'] = $timestamp; 
            $this->query($createNewTokenSQL, $createNewTokenParams);
            return $token;
        }
        
        public function tokenToUserProps($token = ''){
            if ($token != NULL && $token != '') {
                //  && strlen($token) == $this->tokenLength){
                $userSQL = "SELECT auth.item_name as userType, auth.user_id as userId
                    FROM `api_nova_tokens` api
                    LEFT JOIN auth_assignment auth ON auth.user_id = api.user_id
                    WHERE <token> LIKE :token;";
                $userParams['token'] = $token;
                $user = $this->query($userSQL, $userParams)[0];
                $return['userType'] = $user['userType'];
                $return['userId'] = $user['userId'];
                return $return;
            }
            return false;
        }
        
        public function getPostLoginInfo($userId) {
            $sql = "SELECT 
                firstName, lastName, email, `filename` AS 'profilePic',
                termsAccepted, newsletterAccepted, techEmailAccepted, isFirstLogin
            FROM users
            WHERE isDeleted != 1 AND <id> = :id;";
            $params['id'] = $userId;
            $results = $this->query($sql, $params);
            return $results[0];
        }
        
        private function getHashedPassword($username){
            $sql = "SELECT `password` FROM users WHERE isDeleted != 1 AND <email> = :username;";
            $params['username'] = $username;
            $results = $this->query($sql, $params);
            // $return = (isset($results[0]))? $results[0]['password'] : null;
            // return $return;
            return $results[0]['password'];
        }
        
        public function login($username, $password) {
            try {
                $hash = $this->getHashedPassword($username);
                return $this->validatePassword($password, $hash);
            } catch (Exception $exc) {
                // We get here if the password was stored in the DB in the old format, or no password was stored at all (for example with test sessions from the add-in)
                return false; // Just ignore the exception and consider the password invalid.
            }
            return false;
        }
        
        private function validatePassword($password, $hash) {
            $errors = array();
            if (!is_string($password) || $password === '') {
                $errors['Password'] = 'PasswordNotStringOrEmpty';    
            }
            if (!preg_match('/^\$2[axy]\$(\d\d)\$[\.\/0-9A-Za-z]{22}/', $hash, $matches) || $matches[1] < 4 || $matches[1] > 30) {
                $errors['Password'] = 'PasswordHashInvalid';
            }
            $this->errorCheck($errors);
            
            $password = crypt($password, $hash);
            // $password = password_hash($password, PASSWORD_BCRYPT, array('cost' => 13));
            if (strlen($password) !== 60) {
                return false;
            }
            return hash_equals($hash, $password);//Secured against cryptographic timing attacks
        }
        
        public function validateToken($token = '') {
            if ($token != NULL && $token != '') {
                // if ($this->isPhp7() && strlen($token) != $this->tokenLength) {
                //     return false;
                // }
                $findTokenSQL = "SELECT count(token) as res FROM `api_nova_tokens` WHERE <token> LIKE :token;";
                $findTokenParams['token'] = $token;
                $tokenExists = (int) $this->query($findTokenSQL, $findTokenParams)[0]['res'];
                if ($tokenExists > 0){
                    return true;
                }
            }
            return false;
        }
        
        private function generateSalt($cost = 13) {
            $cost = (int) $cost;
            if ($cost < 4 || $cost > 31) {
                throw new InvalidParamException('Cost must be between 4 and 31.');
            }
            // Get a 20-byte random string
            $rand = $this->generateRandomKey(20);
            // Form the prefix that specifies Blowfish (bcrypt) algorithm and cost parameter.
            $salt = sprintf("$2y$%02d$", $cost);
            // Append the random salt data in the required base64 format.
            $salt .= str_replace('+', '.', substr(base64_encode($rand), 0, 22));
            return $salt;
        }
        
        public function generatePasswordHash($password, $cost = null) {
            if ($cost === null) {
                $cost = $this->passwordHashCost;
            }
            $salt = $this->generateSalt($cost);
            $hash = crypt($password, $salt);
            // strlen() is safe since crypt() returns only ascii
            if (!is_string($hash) || strlen($hash) !== 60) {
                $errors['General'] = 'HashUnknown';
            }
            $this->errorCheck($errors);
            return $hash;
        }
    }