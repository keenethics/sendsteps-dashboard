<?php

class HashHelper {
    public static function generateUniqueId($stringLength = 50) {
        $stringLength = 50;
        $permitted = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $uniqueId = substr( uniqid((str_shuffle($permitted)+time()), true), 0, $stringLength);
        return $uniqueId;
    }
}