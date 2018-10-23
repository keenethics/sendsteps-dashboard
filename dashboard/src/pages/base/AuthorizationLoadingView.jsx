import React, { Component } from 'react';
import './View.scss';
class AuthorizationLoadingView extends Component {

    render() {
        return (
            <div className="container fill">
                <div id="map" className="fa-lg">
                    <p>
                        Checking authentication... <i className="fa fa-circle-notch fa-spin"></i>
                    </p>
                </div> 
            </div>
        )
    }
}
export default AuthorizationLoadingView;