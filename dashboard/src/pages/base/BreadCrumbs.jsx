import React, { Component } from 'react';

export default class BreadCrumbs extends Component {

    render() {

        const { urlList } = this.props;

        if(urlList) {
            
            let crumbs = urlList.substring(1)
            let crumbList = crumbs.split('/').filter(String);
            let actualCrumbs = crumbList.map((crumb, index) => (
                <span key={index}> 
                    <i className="crumbs fa fa-caret-right"></i> 
                    <div onClick={() => this.goTo(crumb)} className={"label label-" + (index === crumbList.length-1? 'success' : 'default')}>
                        {crumb.replace("-", " ").toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                    </div>
                </span>
            ));
            actualCrumbs.unshift(<div key={crumbList.length + 1} className="label label-default">
                <span className="home-icon">
                    <i className="fa fa-home fa-xs">a</i>
                </span>
            </div>);

            return <div className="crumbs-panel">
                {actualCrumbs}
            </div>
        }
        return null;
    }
}