import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import SideMenu from './components/menu/SideMenu';
import Header from './components/menu/Header';
import { Redirect } from 'react-router-dom';

export class App extends Component {
    constructor(props) {
        super(props);
        this.loggedIn = this.checkToken(); 
    }
    
    checkToken(){
        if (!sessionStorage.getItem('loggedintoken') || sessionStorage.getItem('loggedintoken') === '') {
            // return false
        } 
        return true 
    }
    
    
    render() {
        if(this.loggedIn !== true) {
            //If not logged in, render login page
            return (
                <div>
                    <label for='username'>Username</label>
                    <input name='username' id='username'></input>
                    <label for='password'>Password</label>
                    <input name='password' id='password'></input>
                </div>
            );
        } else {
            //Try to route to the requested page
            return (
                <div className="App">
                    <Header />
                    <div className="wrapper">
                        <SideMenu />
                        <div className="view">
                            <Routes />
                        </div>
                    </div>
                </div>
            );     
        }
    }
}
export default App;