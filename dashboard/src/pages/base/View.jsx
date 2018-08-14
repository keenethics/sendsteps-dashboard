import React, { Component } from 'react';
import "./../Style.css";
import { connect } from 'react-redux'; 
import LoadingView from './LoadingView';
import ErrorView from './ErrorView';

class View extends Component {
    constructor(props) {
        super();
    }
   
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
        if(this.props.isLoading) {
            return <LoadingView>
                {this.props.children}
                </LoadingView>
        }
        if(!this.props.isLoading && this.props.apiFetchError) {
            return <ErrorView />;
        } else {
            return this.props.children;
        }
    }
} 
export default connect(
    (state) => {
        return {
            isLoading: state.apiReducer.isLoading,
            apiFetchError: state.apiReducer.apiFetchError,
            data: state.apiReducer.data
        }
    }
)(View)