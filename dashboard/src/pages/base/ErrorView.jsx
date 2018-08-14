import React, { Component } from 'react';
import { connect } from 'react-redux';

class ErrorView extends Component {
    render() {
        return (
            <div className="error-container">
                <div class="error">
                    <h1><i className="fa fa-exclamation-circle"></i> Oops! Something went wrong.</h1>
                    <div className="well"><i className="fa fa-exclamation-triangle"></i> {this.props.error || 'Unknown Error, please try refreshing the page.'}</div>
                </div>
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