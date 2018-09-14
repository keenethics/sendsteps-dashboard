<?php 
    $generalErrors = [
        'ControllerClassDoesNotExist' => 'Controller name given, does not match a class',
        'ControllerFileDoesNotExist' => 'Controller name given, does not match any files found',
        'MethodDoesNotExist' => 'The method you requested does not exist',
        'ModelClassDoesNotExist' => 'Model name given, does not match a class',
        'ModelFileDoesNotExist' => 'Model name given, does not match any files found',
        'MethodReturnedNull' => 'Method gave a null response',
        'ModelRequiresId' => 'Model requires ID, no ID provided',
        'SpecifyControllerAndFunction' => 'Controller or Function fields not set',
        'SpecifyFunction' => 'Function field not set',
        'ValidTokenNotSet' => 'Valid token not found',
    ];
    $bastetErrors = [ 
        'HashUnknown' => 'Unknown error occurred while generating hash',
        'PasswordHashInvalid' => 'Hash is invalid',
        'PasswordNotStringOrEmpty' => 'Password must be a string and cannot be empty',
        'PasswordDoNotMatch' => 'Passwords do not match',
        'UsernameBlank' => 'Username is blank',
    ];