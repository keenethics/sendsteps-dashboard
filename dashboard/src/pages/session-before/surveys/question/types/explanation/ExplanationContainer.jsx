import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap'
import { firstOfObject } from '../../../../../../scripts/arrayHelper';

class ExplanationContainer extends Component {

    getFirstOption = options => {
        return firstOfObject(options)
    }

    render() {

        const { options } = this.props;

        return (
            <div className="col-sm-6 col-sm-offset-3">
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="fa fa-list"></i>
                    </span>
                    <FormControl componentClass="textarea" onChange={this.props.updateOptions} value={this.getFirstOption(options)} placeholder="Type your text which you would like to show to your audience" />
                </div>
            </div>
        );
    }
}

export default ExplanationContainer;