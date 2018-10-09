import React, { Component } from 'react';
import "./../Style.css";
import { connect } from 'react-redux'; 
import LoadingView from './LoadingView';
import ErrorView from './ErrorView';
import MainView from './MainView';

class View extends Component {

    render() {

        const { isLoading, error, children } = this.props;

        if(isLoading) {
            return  <LoadingView />;
        }
        if(!isLoading && error) {
            return <ErrorView />;
        } 
        return <MainView>{children}</MainView>;
    }
} 
export default connect(
    (state) => {
        return {
            isLoading: state.apiReducer.isLoading,
            apiFetchError: state.apiReducer.apiFetchError,
            updateError: state.apiReducer.updateError,
            error: state.apiReducer.error,
        }
    }
)(View)