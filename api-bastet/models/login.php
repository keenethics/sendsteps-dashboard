<?php 
    require_once __DIR__.'/../base/model.php';

    class Login_Model extends Model {
        function __construct (){
            $this->table = 'users';
        }
        
        private function getHashedPassword($username){
            $sql = "SELECT `password` FROM users WHERE isDeleted != 1 AND email = '$username';";
            $results = $this->query($sql);
            return json_decode($results)[0]->password;
        }
        
        function login($username, $password){
            try {
                $hash = $this->getHashedPassword($username);
                return $this->validatePassword($password, $hash);
            } catch (InvalidParamException $exc) {
                return false;
                // We get here if the password was stored in the DB in the old format, or no password was stored at all (for example with test sessions from the add-in)
                // Just ignore the exception and consider the password invalid.
            }
            return false;
        }
        
        private function validatePassword($password, $hash)
        {
            if (!is_string($password) || $password === '') {
                throw new InvalidParamException('Password must be a string and cannot be empty.');
            }

            if (!preg_match('/^\$2[axy]\$(\d\d)\$[\.\/0-9A-Za-z]{22}/', $hash, $matches) || $matches[1] < 4 || $matches[1] > 30) {
                throw new InvalidParamException('Hash is invalid.');
            }

            $password = crypt($password, $hash);
            $n = strlen($password);
            if ($n !== 60) {
                return false;
            }
            return $this->compareString($password, $hash);
        }
        
        private static function byteLength($string)
        {
            return mb_strlen($string, '8bit');
        }
        
        private function compareString($expected, $actual)
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