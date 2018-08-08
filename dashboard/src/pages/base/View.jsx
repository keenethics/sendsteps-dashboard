import React, { Component } from "react";
import AppComponent from './AppComponent';
import "./../Style.css";

let api_url = 'http://local-nova.sendsteps.com/index.php';
export default class View extends AppComponent {
    constructor(props) {
        super();
        this.api_url = 'http://local-nova.sendsteps.com/index.php';
    }
    fetchResult = (controller = '', functionName = '', apiParam = '') => {
        fetch(this.api_url,{
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'controller='+controller+'&function='+functionName+'&params='+apiParam
        })
        .then(res => 
            res.json()
        )
        .then(
            (result) => {
                this.setState({
                isLoaded: true,
                items: result
                });
            },
            // Note: It is important to handle errors
            // instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
        )
    }
}