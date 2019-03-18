import React from 'react';

export default class PageNotFound extends React.Component {
    render() {
        return (
            <div className="container fill">
                <h1><strong><i className="fa fa-exclamation-triangle"></i> Oops!</strong></h1>
                <div id="map" className="fa-lg card card-body">
                    <p>This page doesn't exist!</p> 
                    <strong>(Error 404)</strong>
                </div> 
            </div>
        )
    }
}
