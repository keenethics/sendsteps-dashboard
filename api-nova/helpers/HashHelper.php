<?php

class HashHelper {
    public static function generateUniqueId($stringLength = 12) {
        $stringLength = 12;
        $permitted = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $shuffled = str_shuffle($permitted) . time();
        $unique = uniqid($shuffled, true);
        $uniqueId = substr( $unique, 0, $stringLength);
        return $uniqueId;
    }
}