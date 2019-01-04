import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap'
class TextContainer extends Component {
    render() {
        return (
            <div className="col-sm-6 col-sm-offset-3">
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="fa fa-comment-o"></i>
                    </span>
                    <FormControl disabled={true} placeholder="Their Answer" />
                </div>
            </div>
        );
    }
}

export default TextContainer;