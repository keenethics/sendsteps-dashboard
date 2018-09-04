<?php 
    require_once __DIR__.'/../base/model.php';

    class Auth_Model extends Model {
        function __construct () {
            $this->table = 'users';
        }
        
        public function createToken($username) {
            $tokenExists = 'Not NULL';
            //In the event we create a duplicate token, carry on looping until we create a unique one.
            while ($tokenExists != NULL){
                if ($this->isPhp7()) {
                    $token = substr(bin2hex(random_bytes(255)), 0, 250);
                } else {
                    $token = substr( uniqid(("adasdagspagopofpopo"+time()), TRUE), 0, 250);
                }
                $findTokenSQL = "SELECT count(token) as res FROM `api_nova_tokens` WHERE token LIKE '$token';";
                $tokenExists = json_decode($this->query($findTokenSQL)[0]);
            }
            
            $getUserSQL = "SELECT id FROM users WHERE isDeleted != 1 AND email = '$username';";
            $user_id = (int)  (json_decode($this->query($getUserSQL))[0]->id);
            $timestamp = time();
            
            $clearOldTokensSQL = "DELETE FROM `api_nova_tokens` WHERE `user_id` = '$user_id';";
            $this->query($clearOldTokensSQL);
            
            $createNewTokenSQL = "INSERT INTO `api_nova_tokens` (`user_id`, `token`, `timestamp`) VALUES ( $user_id, '$token', $timestamp );";
            $this->query($createNewTokenSQL);
            
            return $token;
        }
        
        private function getHashedPassword($username){
            $sql = "SELECT `password` FROM users WHERE isDeleted != 1 AND email = '$username';";
            $results = $this->query($sql);
            return json_decode($results)[0]->password;
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
            if (!is_string($password) || $password === '') {
                throw new Exception('PasswordNotStringOrEmpty.');
            }
            if (!preg_match('/^\$2[axy]\$(\d\d)\$[\.\/0-9A-Za-z]{22}/', $hash, $matches) || $matches[1] < 4 || $matches[1] > 30) {
                throw new Exception('PasswordHashInvalid');
            }
            $password = crypt($password, $hash);
            // $password = password_hash($password, PASSWORD_BCRYPT, array('cost' => 13));
            if (strlen($password) !== 60) {
                return false;
            }
            return hash_equals($hash, $password);//Secured against cryptographic timing attacks
        }
        
        public function validateToken($token = '') {
            if ($token != NULL && $token != ''){
                $findTokenSQL = "SELECT count(token) as res FROM `api_nova_tokens` WHERE token LIKE '$token';";
                $tokenExists = json_decode($this->query($findTokenSQL)[0]);
                if ($tokenExists != NULL){
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
                throw new Exception('Unknown error occurred while generating hash.');
            }
            return $hash;
        }
    }