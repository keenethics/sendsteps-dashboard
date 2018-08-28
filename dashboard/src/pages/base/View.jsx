import React, { Component } from 'react';
import "./../Style.css";
import { connect } from 'react-redux'; 
import LoadingView from './LoadingView';
import ErrorView from './ErrorView';
import TransitionGroup from 'react-transition-group/TransitionGroup';

class View extends Component {

    getBreadCrumbs() {
        if(this.props.match.url) {
            let crumbs = this.props.match.url.substring(1);
            let crumbList = crumbs.split('/');
            let actualCrumbs = crumbList.map((crumb, index) => (
                <span key={index}> 
                    <i className="crumbs fa fa-caret-right"></i> 
                    <div className={"label label-" + (index === crumbList.length-1? 'success' : 'default')}>
                        {crumb}
                    </div>
                </span>
            ));
            actualCrumbs.unshift(<div key={crumbList.length + 1} className="label label-default">
                <span className="home-icon">
                    <i className="fa fa-home fa-xs"></i>
                </span>
            </div>);

            return <div className="crumbs-panel">
                {actualCrumbs}
            </div>
        }
        return null;
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