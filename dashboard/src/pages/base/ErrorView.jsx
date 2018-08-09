import React, { Component } from 'react';
import { connect } from 'react-redux';

class ErrorView extends Component {
    render() {
        return (
            <div className="error-container">
                <div class="error">
                    <h1><i className="fa fa-exclamation-circle"></i> Oops! Something went wrong</h1>
                    <code>{this.props.error || 'Unknown Error'}</code>
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