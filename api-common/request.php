<?php 

class Request {

    // Return associative object with params as attributes
    public function __construct($params) {
        foreach($params as $key => $value) {
            $this->{$key} = $value;
        }
        return $this;
    }
}