<?php
	require 'inc/phpmailer/PHPMailerAutoload.php';

	// define separators and terminators that are used in the requests and responses between add-in and server
	define ("SEPARATOR", "-");
	define ("TERMINATOR", "|");

	if(!function_exists("mime_content_type"))
	{
		function mime_content_type($file)
		{
			if (function_exists("finfo_open"))
			{
				$open_bit = finfo_open(FILEINFO_MIME_TYPE);
				return finfo_file($open_bit, $file);
			}
			return 'application/octet-stream';
		}
	}

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

	/**
	 * Write an error response with a base64 encoded reason.
	 *
	 * @param string $reason the reason of the failure.
	 */
	function WriteError($reason)
	{
		echo("error".SEPARATOR.base64_encode($reason)); //)
	}

	/**
	 * Return all parameters of the add-in's request.
	 *
	 * @param string $fullRequest
	 * @return array all found parameters.
	 */
	function ExplodeRequest($fullRequest)
	{
		$parameters = explode(SEPARATOR, $fullRequest);
		return $parameters;
	}

	/**
	 * Decodes a base64 encoded parameter
	 * @param type $encodedParam the encoded parameter
	 * @return string the decoded parameter
	 */
	function DecodeParam($encodedParam)
	{
		$encodedParam = str_replace(' ', '+', $encodedParam);

		$decodedParam = "";

		// decode in chunks of 512, since base64_decode() has an issue with large size
		$chunkSize = 512;
		for ($i = 0; $i < ceil(strlen($encodedParam) /$chunkSize); $i++)
		   $decodedParam .= base64_decode(substr($encodedParam, $i*$chunkSize, $chunkSize));

		// if base64_decode has returned false, then it isn't a valid base64
		if ($decodedParam === FALSE)
			throw new Exception("Invalid format of the parameter.");

		return $decodedParam;
	}

	/**
	 * Sends an e-mail.
	 *
	 * @param string $to one or more destination e-mail addresses
	 * @param string $from the source e-mail address
	 * @param string $subject the subject of the e-mail
	 * @param string $htmlText the html version of the e-mail body
	 * @param string $plainText the plain-text version of the e-mail body
	 * @param string $attachmentName name of the attachment as shown in the e-mail
	 * @param string $attachmentFile actual local filename of the attachment
	 * @throws Exception
	 */
	function SendMail($to, $from, $fromName, $subject, $htmlText, $plainText, $attachmentName, $attachmentFile)
	{
		$mailer = new PHPMailer;

		$mailer->From = $from;
		$mailer->FromName = $fromName;

		// $to can be a comma separated list, but PHPMailer does not like that. Split it and feed each entry individually.
		$toAddresses = explode(',', str_replace(';', ',', $to));
		foreach ($toAddresses as $toAddress)
		{
			$mailer->addAddress($toAddress);
		}
		$mailer->addAddress($to);

		$mailer->addAttachment($attachmentFile, $attachmentName);

		$mailer->Subject = $subject;

		$mailer->isHTML(true);
		$mailer->Body = $htmlText;
		$mailer->AltBody = $plainText;

		if (!$mailer->send())
		{
			error_log("Error sending mail: " . $mailer->ErrorInfo);
			throw new Exception("Sending e-mail has failed.");
		}
		// else
		// {
		// 	error_log("YAY");
		// }
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

function generateCallTrace()
{
    $e = new Exception();
    $trace = explode("\n", $e->getTraceAsString());
    // reverse array to make steps line up chronologically
    $trace = array_reverse($trace);
    array_shift($trace); // remove {main}
    array_pop($trace); // remove call to this method
    $length = count($trace);
    $result = array();

    for ($i = 0; $i < $length; $i++)
    {
        $result[] = ($i + 1)  . ')' . substr($trace[$i], strpos($trace[$i], ' ')); // replace '#someNum' with '$i)', set the right ordering
    }

    return "\t" . implode("\n\t", $result);
}

function startsWith($haystack, $needle)
{
     $length = strlen($needle);
     return (substr($haystack, 0, $length) === $needle);
}

function endsWith($haystack, $needle)
{
    $length = strlen($needle);
    if ($length == 0) {
        return true;
    }

    return (substr($haystack, -$length) === $needle);
}
