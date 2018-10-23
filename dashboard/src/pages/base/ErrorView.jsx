import React, { Component } from 'react';
import { connect } from 'react-redux';
import './View.scss';

class ErrorView extends Component {
    render() {
        return (
            <div className="container fill">
                <h1><strong><i className="fa fa-exclamation-triangle"></i> Oops!</strong></h1>
                <div id="map" className="fa-lg well error">Error: {this.props.error.General || 'Unknown Error, please try refreshing the page.'}</div> 
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            error: state.apiReducer.error
        }
    }
) (ErrorView)