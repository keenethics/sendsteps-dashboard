<?php

    //Authentication API - Acts as a guardian for frontend calls & for checks being made by the main Nova-API
    class Base {
        public function errorCheck($errors = array()){
            if (count($errors) > 0){
                $errors = json_encode($errors);
                throw new Exception($errors);
            }
            return true;
        }
    }