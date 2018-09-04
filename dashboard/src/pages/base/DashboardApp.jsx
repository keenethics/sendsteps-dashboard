import React, { Component } from 'react';
import Routes from '../../Routes';
import SideMenu from '../../components/menu/SideMenu';
import Header from '../../components/menu/Header';
import View from '../../pages/base/View';

export default class DashboardApp extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div className="wrapper">
                    <SideMenu />
                    <div className="view">
                        <View>
                            <Routes />
                        </View>
                    </div>
                </div>
            </div>
        ); 
    }
}