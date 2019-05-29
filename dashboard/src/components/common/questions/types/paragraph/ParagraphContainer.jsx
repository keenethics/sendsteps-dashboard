import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap'

class ParagraphContainer extends Component {
    render() {
        return (
            <div className="col-sm-9 col-sm-offset-3 mb-3">
                <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa fa-comment-o"></i>
                        </span>
                    </div>
                    <textarea className="form-control" disabled={true} placeholder="Their Longer Answer" >
                    </textarea>
                </div>
            </div>
        );
    }
}

export default ParagraphContainer;