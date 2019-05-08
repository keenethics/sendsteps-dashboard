import React, { Component } from 'react';
import { FormGroup, InputGroup, FormControl } from "react-bootstrap";

class CheckboxOption extends Component {

    state = {
        addedNext: false
    }

    setOptionText = e => {
        const { optionKey, addOption, deleteOption, setOptionText } = this.props
        let { addedNext } = this.state

        setOptionText(e.target.value, optionKey)
        if(!addedNext) {
            addOption();
            addedNext = true
        } 

        if(e.target.value.length < 1) {
            deleteOption(optionKey)
            addedNext = false
        }
        this.setState({ addedNext })
    }

    deleteOption = () => {
        const { optionKey, deleteOption } = this.props;
        deleteOption(optionKey)
    }

    isGeneratedKey = key => {
        return !Number.isInteger(parseInt(key, 10))
    }

    render() {

        const { addedNext } = this.state
        const { option, optionKey } = this.props;

        return (
            <FormGroup>
                <InputGroup>
                    <div className="input-group-prepend disabled">
                        <div className="input-group-text">
                            <input type="radio" disabled="disabled" />
                        </div>
                    </div>
                    <FormControl placeholder="Answer Option" value={option} onChange={this.setOptionText} type="text" />
                    {(addedNext || !this.isGeneratedKey(optionKey)) &&
                    <div onClick={this.deleteOption} className="input-group-append">
                        <button className="btn btn-outline-danger"><i className="fa fa-trash"></i> Delete</button>
                    </div>}
                </InputGroup>
            </FormGroup>
        );
    }
}

export default CheckboxOption;