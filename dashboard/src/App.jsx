import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import SideMenu from './components/menu/SideMenu';
import Header from './components/menu/Header';
import { Redirect } from 'react-router-dom';

export class App extends Component {
    constructor(props) {
        super(props);
        this.loggedIn = this.checkAuth(); 
    }
    
    checkAuth(){
        if (!sessionStorage.getItem('loggedintoken') || sessionStorage.getItem('loggedintoken') == ''){
            // return false
        } else {
            //call authorizer
        }
        // this.loggedIn = sessionStorage.getItem('loggedin') === 'false';
        return true 
    }
    
    render() {
        // this.loggedIn = true;
        if(this.loggedIn != true) {
            return <Redirect to='/login'/>;
        }
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
        // } else {
        //     return (<div>Test</div>);
        // }
    }
}
export default App;