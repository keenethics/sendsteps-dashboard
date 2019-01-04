import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap'

class ExplanationContainer extends Component {

    getFirstOption = options => {
        console.log(options[Object.keys(options)[0]])
        return options[Object.keys(options)[0]];
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