import React, { Component } from 'react';
import "./../Style.css";
import { connect } from 'react-redux'; 
import LoadingView from './LoadingView';
import ErrorView from './ErrorView';
import PageNotFound from './PageNotFound';

class View extends Component {

    render() {

        const { isLoading, error, children } = this.props;

        if(isLoading) {
            return  <LoadingView />;
        }
        if(!isLoading && error) {
            return <ErrorView />;
        } 
        if(!children) {
            return <PageNotFound />
        }
        return children;
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