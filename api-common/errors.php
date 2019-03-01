<?php 
    $generalErrors = [
        'ControllerClassDoesNotExist' => 'Controller name given, does not match a class',
        'ControllerFileDoesNotExist' => 'Controller name given, does not match any files found',
        'MethodDoesNotExist' => 'The method you requested does not exist',
        'ModelClassDoesNotExist' => 'Model name given, does not match a class',
        'ModelFileDoesNotExist' => 'Model name given, does not match any files found',
        'MethodReturnedNull' => 'Method gave a null response',
        'ModelRequiresId' => 'Model requires ID, no ID provided',
        'ModelRequiresTable' => 'Model requires Table name, no table provided',
        'SpecifyControllerAndFunction' => 'Controller or Function fields not set',
        'SpecifyFunction' => 'Function field not set',
        'ValidTokenNotSet' => 'Valid token not found',
        'UpdateFailed' => 'An update failed',
        'Permissions' => 'You lack sufficient permissions for this action',
    ];
    $bastetErrors = [ 
        'HashUnknown' => 'Unknown error occurred while generating hash',
        'PasswordHashInvalid' => 'Hash is invalid',
        'PasswordNotStringOrEmpty' => 'Password must be a string and cannot be empty',
        'PasswordDoNotMatch' => 'Passwords do not match',
        'UsernameBlank' => 'Username is blank',
    ];