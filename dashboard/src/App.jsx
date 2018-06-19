import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import SideMenu from './components/menu/SideMenu';
import Header from './components/menu/Header';

export class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div className="wrapper">
                    <SideMenu />
                    <Routes />
                </div>
            </div>
        );
    }
}
export default App;