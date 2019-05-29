import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap'
import { firstOfObject, generateKey } from 'App/scripts/arrayHelper';

class ExplanationContainer extends Component {

    getFirstOption = options => {
        return firstOfObject(options)
    }
    
    isGeneratedKey = key => {
        return !Number.isInteger(parseInt(key, 10))
    }

    setExplanationText = e => {
        const { options } = this.props;
        if(this.isGeneratedKey(firstOfObject(options))) {
            this.props.setOptions({
                [options[Object.keys(options)[0]]]: e.target.value
            })
        } else {
            this.props.setOptions({
                [generateKey()]: e.target.value
            })
        }
    }

    render() {

        const { options } = this.props;

        return (
            <div className="col-sm-9 col-sm-offset-3 mb-3">
                <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                        <span className="input-group-text px-3">
                            <i className="fa fa-list"></i>
                        </span>
                    </div>
                    <textarea 
                        className="form-control"
                        onChange={this.setExplanationText} 
                        value={this.getFirstOption(options)} 
                        placeholder="Type your text which you would like to show to your audience" 
                    ></textarea>
                </div>
            </div>
        );
    }
}

export default ExplanationContainer;