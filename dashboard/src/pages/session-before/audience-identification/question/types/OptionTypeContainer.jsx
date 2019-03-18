import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap'
import MultipleChoiceContainer from './multiplechoice/MultipleChoiceContainer'
import TextContainer from './text/TextContainer';
import CheckboxContainer from './checkbox/CheckboxContainer';

class OptionTypeContainer extends Component {
    
    state = {
        options: null,
        optionsLoaded: false
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.options && !this.state.optionsLoaded) {
            this.setState({ optionsLoaded: true })
        } 
    }

    isTextQuestion = type => {
        return type === 'textbox'
    }

    isMultipleChoiceQuestion = type => {
        return type === 'checkbox'
    }

    isCheckboxQuestion = type => {
        return type === 'radio'
    }

    render() {

        const { type, options } = this.props

        return (
            <div className="form-group row">
                <div className="col-sm-3">
                </div>
                {this.isTextQuestion(type) && <>
                    <TextContainer />
                </>}
                {this.isMultipleChoiceQuestion(type) && <>
                    <MultipleChoiceContainer 
                        options={options} 
                        updateOptions={(text, key) => this.props.updateOptions(text, key)}
                        addOption={() => this.props.addOption()}
                        deleteOption={key => this.props.deleteOption(key)}
                    />
                </>}
                {this.isCheckboxQuestion(type) && <>
                    <CheckboxContainer 
                        options={options} 
                        updateOptions={(text, key) => this.props.updateOptions(text, key)}
                        addOption={() => this.props.addOption()}
                        deleteOption={key => this.props.deleteOption(key)}
                    />
                </>}
            </div>
        );
    }
}

export default OptionTypeContainer;