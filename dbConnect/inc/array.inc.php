<?php
/**
 * Created by PhpStorm.
 * User: VENKATESH.B
 * Date: 16/9/14
 * Time: 3:53 PM
 */
function column_array(array $input, $columnKey, $indexKey = null)
{
    $array = array();
    foreach ($input as $value) {
        if ( ! isset($value[$columnKey])) {
            trigger_error("Key \"$columnKey\" does not exist in array");
            return false;
        }

        if (is_null($indexKey)) {
            $array[] = $value[$columnKey];
        } else {
            if ( ! isset($value[$indexKey])) {
                trigger_error("Key \"$indexKey\" does not exist in array");
                return false;
            }
            if ( ! is_scalar($value[$indexKey])) {
                trigger_error("Key \"$indexKey\" does not contain scalar value");
                return false;
            }
            $array[$value[$indexKey]] = $value[$columnKey];
        }
    }

    return $array;
}