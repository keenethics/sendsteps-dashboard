import React, { Component } from "react";
import AppComponent from './AppComponent';
import "./../Style.css";

let api_url = 'http://local-nova.sendsteps.com/index.php';
export default class View extends AppComponent {
    constructor(props) {
        super();
        this.api_url = 'http://local-nova.sendsteps.com/index.php';
    }
}