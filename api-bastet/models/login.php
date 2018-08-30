<?php 
    require_once __DIR__.'/../base/model.php';

    class Login_Model extends Model {
        function __construct (){
            $this->table = 'users';
        }
        
        function getHashedPassword($username){
            $sql = "SELECT `password` FROM users WHERE isDeleted != 1 AND email = '$username';";
            $results = $this->query($sql);
            return json_decode($results)[0]->password;
        }
        
        function login($username, $password){
            $hash = $this->getHashedPassword($username);
            
            try
            {
                return $this->validatePassword($password, $hash);
            }
            catch (InvalidParamException $exc)
            {
                // We get here if the password was stored in the DB in the old format, or no password was stored at all (for example with test sessions from the add-in)
                // Just ignore the exception and consider the password invalid.
            }
            return false;
        }
        
        function validatePassword($password, $hash)
        {
            if (!is_string($password) || $password === '') {
                throw new InvalidParamException('Password must be a string and cannot be empty.');
            }

            if (!preg_match('/^\$2[axy]\$(\d\d)\$[\.\/0-9A-Za-z]{22}/', $hash, $matches) || $matches[1] < 4 || $matches[1] > 30) {
                throw new InvalidParamException('Hash is invalid.');
            }

            $test = crypt($password, $hash);
            $n = strlen($test);
            if ($n !== 60) {
                return false;
            }
            return $this->compareString($test, $hash);
            
            
            // switch ($this->passwordHashStrategy) {
            //     case 'password_hash':
            //         if (!function_exists('password_verify')) {
            //             throw new InvalidConfigException('Password hash key strategy "password_hash" requires PHP >= 5.5.0, either upgrade your environment or use another strategy.');
            //         }
            //         return password_verify($password, $hash);
            //     case 'crypt':
                    // $test = crypt($password, $hash);
                    // $n = strlen($test);
                    // if ($n !== 60) {
                    //     return false;
                    // }
                    // return $this->compareString($test, $hash);
                // default:
                //     throw new InvalidConfigException("Unknown password hash strategy '{$this->passwordHashStrategy}'");
        }
        
        public static function byteLength($string)
        {
            return mb_strlen($string, '8bit');
        }
        
        public function compareString($expected, $actual)
        {
            $expected .= "\0";
            $actual .= "\0";
            $expectedLength = self::byteLength($expected);
            $actualLength = self::byteLength($actual);
            $diff = $expectedLength - $actualLength;
            for ($i = 0; $i < $actualLength; $i++) {
                $diff |= (ord($actual[$i]) ^ ord($expected[$i % $expectedLength]));
            }
            return $diff === 0;
        }
    }

?>