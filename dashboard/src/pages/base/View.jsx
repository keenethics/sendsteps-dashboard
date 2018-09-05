import React, { Component } from 'react';
import "./../Style.css";
import { connect } from 'react-redux'; 
import LoadingView from './LoadingView';
import ErrorView from './ErrorView';

class View extends Component {

    componentWillReceiveProps(nextProps) {
        console.log('receiving props!');
    }

    render() {
        const { isLoading, data, error, children } = this.props;
        
        if(isLoading && !data) {
            return  <LoadingView> {children} </LoadingView>
        }
        if(!isLoading && error) {
            return <ErrorView />;
        } 
        return children;
    }
} 
export default connect(
    (state) => {
        return {
            isLoading: state.apiReducer.isLoading,
            apiFetchError: state.apiReducer.apiFetchError,
            data: state.apiReducer.data,
            error: state.apiReducer.error
        }
    }
)(View)