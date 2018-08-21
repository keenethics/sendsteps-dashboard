import React from 'react';

class AuthorizationLoadingView extends React.Component {
    render() {
        return (
            <div className="container fill">
                <div id="map" className="fa-lg">Checking authentication... <i className="fa fa-circle-notch fa-spin"></i></div> 
            </div>
        )
    }
}

export default AuthorizationLoadingView;