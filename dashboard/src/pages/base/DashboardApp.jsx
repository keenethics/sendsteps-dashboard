import React, { Component } from 'react';
import Routes from '../../Routes';
import SideMenu from '../../components/menu/SideMenu';
import Header from '../../components/menu/Header';
import ToastComponent from '../../components/common/ToastComponent'
import View from '../../pages/base/View';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './DashboardApp.scss';
class DashboardApp extends Component {
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
                    <ToastComponent />
                </div>

            </div>
        ); 
    }
}

export default withRouter(connect()(DashboardApp));