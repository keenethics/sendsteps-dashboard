import React, { Component } from 'react';
import './View.scss';
class AuthorizationLoadingView extends Component {

    state = {
        authMessage: 'Checking authentication...'
    }

    componentDidMount() {
        try {
            setTimeout(() => {
                this.setState({
                    authMessage: "It's taking a bit longer than expected..."
                }, () => {
                    window.location = window.location;
                })
            }, 5000)
        } catch(err) {
            console.warn(err);
        }
    }

    render() {
        return (
            <div className="container fill">
                <div id="map" className="fa-lg">
                    <p>
                        {this.state.authMessage} <i className="fa fa-circle-o-notch fa-spin"></i>
                    </p>
                </div> 
            </div>
        )
    }
}
export default AuthorizationLoadingView;