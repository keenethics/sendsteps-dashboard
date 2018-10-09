import React, { Component } from 'react';
import { connect } from 'react-redux';

class BreadCrumbs extends Component {

    render() {

        const { breadCrumbsUrl } = this.props;

        if(breadCrumbsUrl) {
            
            let crumbs = breadCrumbsUrl.substring(1)
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