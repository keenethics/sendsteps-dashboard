<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



if (!function_exists('hash_equals')) {

	/**
	 * Timing attack safe string comparison
	 *
	 * Compares two strings using the same time whether they're equal or not.
	 * This function should be used to mitigate timing attacks; for instance, when testing crypt() password hashes.
	 *
	 * @param string $known_string The string of known length to compare against
	 * @param string $user_string The user-supplied string
	 * @return boolean Returns TRUE when the two strings are equal, FALSE otherwise.
	 */
	function hash_equals($known_string, $user_string)
	{
		if (func_num_args() !== 2) {
			// handle wrong parameter count as the native implentation
			trigger_error('hash_equals() expects exactly 2 parameters, ' . func_num_args() . ' given', E_USER_WARNING);
			return null;
		}
		if (is_string($known_string) !== true) {
			trigger_error('hash_equals(): Expected known_string to be a string, ' . gettype($known_string) . ' given', E_USER_WARNING);
			return false;
		}
		$known_string_len = strlen($known_string);
		$user_string_type_error = 'hash_equals(): Expected user_string to be a string, ' . gettype($user_string) . ' given'; // prepare wrong type error message now to reduce the impact of string concatenation and the gettype call
		if (is_string($user_string) !== true) {
			trigger_error($user_string_type_error, E_USER_WARNING);
			// prevention of timing attacks might be still possible if we handle $user_string as a string of diffent length (the trigger_error() call increases the execution time a bit)
			$user_string_len = strlen($user_string);
			$user_string_len = $known_string_len + 1;
		} else {
			$user_string_len = $known_string_len + 1;
			$user_string_len = strlen($user_string);
		}
		if ($known_string_len !== $user_string_len) {
			$res = $known_string ^ $known_string; // use $known_string instead of $user_string to handle strings of diffrent length.
			$ret = 1; // set $ret to 1 to make sure false is returned
		} else {
			$res = $known_string ^ $user_string;
			$ret = 0;
		}
		for ($i = strlen($res) - 1; $i >= 0; $i--) {
			$ret |= ord($res[$i]);
		}
		return $ret === 0;
	}

}

// Taken from Shakespeak backoffice
function generateActivationCode($iLength = 6){
	//To Pull Unique Random Values Out Of AlphaNumeric
	//removed number 0, capital o, number 1 and small L
	$characters = array(
		'A','B','C','D','E','F','G','H','J','K','L','M',
		'N','P','Q','R','S','T','U','V','W','X','Y','Z',
		'1','2','3','4','5','6','7','8','9'
	);
	$chars = array();
	while(count($chars) < $iLength) {
		$x = mt_rand(0, count($characters)-1);
//		    if(!in_array($x, $chars)) {
		   $chars[] = $characters[$x];
//		    }
	}
	return implode('', $chars);
}


// Random functions from Yii framework

/**
 * Generates specified number of random bytes.
 * Note that output may not be ASCII.
 * @see generateRandomString() if you need a string.
 *
 * @param integer $length the number of bytes to generate
 * @return string the generated random bytes
 * @throws InvalidConfigException if OpenSSL extension is required (e.g. on Windows) but not installed.
 * @throws Exception on failure.
 */
function generateRandomKey($length = 32)
{
    /*
     * Strategy
     *
     * The most common platform is Linux, on which /dev/urandom is the best choice. Many other OSs
     * implement a device called /dev/urandom for Linux compat and it is good too. So if there is
     * a /dev/urandom then it is our first choice regardless of OS.
     *
     * Nearly all other modern Unix-like systems (the BSDs, Unixes and OS X) have a /dev/random
     * that is a good choice. If we didn't get bytes from /dev/urandom then we try this next but
     * only if the system is not Linux. Do not try to read /dev/random on Linux.
     *
     * Finally, OpenSSL can supply CSPR bytes. It is our last resort. On Windows this reads from
     * CryptGenRandom, which is the right thing to do. On other systems that don't have a Unix-like
     * /dev/urandom, it will deliver bytes from its own CSPRNG that is seeded from kernel sources
     * of randomness. Even though it is fast, we don't generally prefer OpenSSL over /dev/urandom
     * because an RNG in user space memory is undesirable.
     *
     * For background, see http://sockpuppet.org/blog/2014/02/25/safely-generate-random-numbers/
     */

    $bytes = '';

    // If we are on Linux or any OS that mimics the Linux /dev/urandom device, e.g. FreeBSD or OS X,
    // then read from /dev/urandom.
    if (@file_exists('/dev/urandom')) {
        $handle = fopen('/dev/urandom', 'r');
        if ($handle !== false) {
            $bytes .= fread($handle, $length);
            fclose($handle);
        }
    }

    if (StringHelper::byteLength($bytes) >= $length) {
        return StringHelper::byteSubstr($bytes, 0, $length);
    }

    // If we are not on Linux and there is a /dev/random device then we have a BSD or Unix device
    // that won't block. It's not safe to read from /dev/random on Linux.
    if (PHP_OS !== 'Linux' && @file_exists('/dev/random')) {
        $handle = fopen('/dev/random', 'r');
        if ($handle !== false) {
            $bytes .= fread($handle, $length);
            fclose($handle);
        }
    }

    if (StringHelper::byteLength($bytes) >= $length) {
        return StringHelper::byteSubstr($bytes, 0, $length);
    }

    if (!extension_loaded('openssl')) {
        throw new Exception('The OpenSSL PHP extension is not installed.');
    }

    $bytes .= openssl_random_pseudo_bytes($length, $cryptoStrong);

    if (StringHelper::byteLength($bytes) < $length || !$cryptoStrong) {
        throw new Exception('Unable to generate random bytes.');
    }

    return StringHelper::byteSubstr($bytes, 0, $length);
}

/**
 * Generates a random string of specified length.
 * The string generated matches [A-Za-z0-9_-]+ and is transparent to URL-encoding.
 *
 * @param integer $length the length of the key in characters
 * @return string the generated random key
 * @throws InvalidConfigException if OpenSSL extension is needed but not installed.
 * @throws Exception on failure.
 */
function generateRandomString($length = 32)
{
    $bytes = generateRandomKey($length);
    // '=' character(s) returned by base64_encode() are always discarded because
    // they are guaranteed to be after position $length in the base64_encode() output.
    return strtr(substr(base64_encode($bytes), 0, $length), '+/', '_-');
}


class StringHelper
{
    /**
     * Returns the number of bytes in the given string.
     * This method ensures the string is treated as a byte array by using `mb_strlen()`.
     * @param string $string the string being measured for length
     * @return integer the number of bytes in the given string.
     */
    public static function byteLength($string)
    {
        return mb_strlen($string, '8bit');
    }

    /**
     * Returns the portion of string specified by the start and length parameters.
     * This method ensures the string is treated as a byte array by using `mb_substr()`.
     * @param string $string the input string. Must be one character or longer.
     * @param integer $start the starting position
     * @param integer $length the desired portion length. If not specified or `null`, there will be
     * no limit on length i.e. the output will be until the end of the string.
     * @return string the extracted part of string, or FALSE on failure or an empty string.
     * @see http://www.php.net/manual/en/function.substr.php
     */
    public static function byteSubstr($string, $start, $length = null)
    {
        return mb_substr($string, $start, $length === null ? mb_strlen($string, '8bit') : $length, '8bit');
    }

}