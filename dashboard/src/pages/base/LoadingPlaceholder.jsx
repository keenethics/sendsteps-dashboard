import React, { Component } from 'react';
import './LoadingPlaceholder.scss'

class LoadingPlaceholder extends Component {
    render() {
        return (
            <div className="loading-placeholder">
                <span>
                    <i className="fa fa-circle-o-notch fa-spin"></i> Loading data...
                </span>
            </div>
        )
    }
}

export default LoadingPlaceholder;