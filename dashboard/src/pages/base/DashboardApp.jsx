import React, { Component } from 'react';
import Routes from '../../Routes';
import SideMenu from '../../components/menu/SideMenu';
import Header from '../../components/menu/Header';
import View from '../../pages/base/View';
import { connect } from 'react-redux';
import { simulateLoading } from '../../actions/api';

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
                </div>
                <div className="footer">
                   <p>&#x24B8; Sendsteps </p>
                </div>
            </div>
        ); 
    }
}

export default connect()(DashboardApp);