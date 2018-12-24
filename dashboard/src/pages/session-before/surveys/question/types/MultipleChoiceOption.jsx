import React, { Component } from 'react';
import { FormGroup, InputGroup, FormControl, Button } from "react-bootstrap";

class MultipleChoiceOption extends Component {

    state = {
        addedNext: false
    }

    setOptionText = e => {
        this.props.setOptionText(e.target.value, this.props.optionIndex)
        if(!this.state.addedNext) {
            this.props.addOption();
            this.state.addedNext = true
        } 
        this.setState({
            addedNext: this.state.addedNext
        })
    }

    deleteOption = optionIndex => {
        this.setState({addedNext: false})
        this.props.deleteOption(optionIndex)
    }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.optionText === "") {
    //         this.setState({addedNext: false})
    //     }
    // } 
    
    render() {

        const { addedNext } = this.state
        const { optionIndex, optionText } = this.props;

        return (
            <FormGroup>
                <InputGroup>
                    <div className="input-group-addon disabled">
                        <input type="checkbox" disabled="disabled" />
                    </div>
                    <FormControl placeholder="Answer Option" value={optionText} onChange={this.setOptionText} type="text" />
                    {addedNext &&
                    <div onClick={() => this.deleteOption(optionIndex)} className="input-group-addon btn btn-primary">
                        <i className="fa fa-trash"></i> Delete
                    </div>}
                </InputGroup>
            </FormGroup>
        );
    }
}

export default MultipleChoiceOption;