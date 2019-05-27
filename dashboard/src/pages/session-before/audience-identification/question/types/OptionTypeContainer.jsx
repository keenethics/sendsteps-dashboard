import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap'
import MultipleChoiceContainer from './multiplechoice/MultipleChoiceContainer'
import TextContainer from './text/TextContainer';
import CheckboxContainer from './checkbox/CheckboxContainer';

class OptionTypeContainer extends Component {
    
    isTextQuestion = type => {
        return type === 'textbox'
    }

    isMultipleChoiceQuestion = type => {
        return type === 'checkbox'
    }

    isCheckboxQuestion = type => {
        return type === 'radio'
    }

    updateOptions = (value, key) => {
        let { options } = this.props.question;
        options[key] = value;
        this.props.updateQuestionProperties({options});
    }
 
    render() {

        const { type, options } = this.props.question;

        return (
            <div className="form-group row mb-0">
                <div className="col-sm-3">
                </div>
                {this.isTextQuestion(type) && <>
                    <TextContainer />
                </>}
                {this.isMultipleChoiceQuestion(type) && <>
                    <MultipleChoiceContainer 
                        options={options} 
                        updateOptions={(text, key) => this.updateOptions(text, key)}
                        addOption={() => this.props.addOption()}
                        deleteOption={key => this.props.deleteOption(key)}
                    />
                </>}
                {this.isCheckboxQuestion(type) && <>
                    <CheckboxContainer 
                        options={options} 
                        updateOptions={(text, key) => this.updateOptions(text, key)}
                        addOption={() => this.props.addOption()}
                        deleteOption={key => this.props.deleteOption(key)}
                    />
                </>}
            </div>
        );
    }
}

export default OptionTypeContainer;