import React from 'react';
import { connect } from 'react-redux';
import { clearData } from './../../actions/api';

class MainView extends React.Component {

    componentWillUnmount() {
        // Clear data when unmounting to prevent issues 
        // regarding data sharing on pages
        this.props.dispatch(clearData());
    }
    render() {
        return this.props.children;
    }
}
export default connect() (MainView);