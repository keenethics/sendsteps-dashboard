import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BreadCrumbs.scss';

class BreadCrumbs extends Component {

    render() {

        const { breadCrumbsUrl } = this.props;

        if(breadCrumbsUrl) {
            
            let crumbs = breadCrumbsUrl.substring(1)
            
            crumbs = crumbs.replace("session-before/", "before-session/");    
            crumbs = crumbs.replace("session-during/", "during-the-session/");
            crumbs = crumbs.replace("session-results/", "after-session/");
            crumbs = crumbs.replace("user/edit-profile/", "my-profile/edit/");
            
            
            let crumbList = crumbs.split('/').filter(String);
            let actualCrumbs = crumbList.map((crumb, index) => (
                <span key={index}> 
                    <span> / </span>
                    <div className={"label label-" + (index === crumbList.length-1? 'success' : 'default')}>
                        {crumb.replace("-", " ").toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
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
}

export default connect(
    (state) => {
        return {
            breadCrumbsUrl: state.appReducer.breadCrumbsUrl
        }
    }
) (BreadCrumbs);