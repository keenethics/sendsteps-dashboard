import React, { Component } from 'react';

export default class BreadCrumbs extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if(this.props.urlList) {
            let crumbs = this.props.urlList.substring(1);
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
}