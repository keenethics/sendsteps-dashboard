import React, { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap'
import MultipleChoiceContainer from './multiplechoice/MultipleChoiceContainer'
import ParagraphContainer from './paragraph/ParagraphContainer';
import TextContainer from './text/TextContainer';
import ExplanationContainer from './explanation/ExplanationContainer';
import CheckboxContainer from './checkbox/CheckboxContainer';
import ScaleContainer from './scale/ScaleContainer';

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
        const textTypeIndex = 1
        return type.survey_question_type_id === textTypeIndex
    }

    isParagraphQuestion = type => {
        const paragraphTypeIndex = 2
        return type.survey_question_type_id === paragraphTypeIndex
    }

    isMultipleChoiceQuestion = type => {
        const multipleChoiceTypeIndex = 3
        return type.survey_question_type_id === multipleChoiceTypeIndex
    }

    isCheckboxQuestion = type => {
        const checkboxTypeIndex = 4
        return type.survey_question_type_id === checkboxTypeIndex
    }

    isScaleQuestion = type => {
        const scaleTypeIndex = 5
        return type.survey_question_type_id === scaleTypeIndex
    }

    isExplanationQuestion = type => {
        const explanationTypeIndex = 6
        return type.survey_question_type_id === explanationTypeIndex
    }

    render() {

        const { type, options } = this.props

        return (
            <FormGroup>
                <div className="row">
                    <div className="col-sm-3">
                    </div>
                        {this.isTextQuestion(type) && <>
                            <TextContainer />
                        </>}
                        {this.isParagraphQuestion(type) && <>
                            <ParagraphContainer />
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
                        {this.isScaleQuestion(type) && <>
                            <ScaleContainer
                                options={options}
                                addOption={() => this.props.addOption()}
                                updateOptions={(text, key) => this.props.updateOptions(text, key)}
                                setAllOptions={this.props.setAllOptions}
                            />
                        </>}
                        {this.isExplanationQuestion(type) && <>
                            <ExplanationContainer 
                                options={options}
                                updateOptions={this.props.updateSingleOption}
                            />
                        </>}
                </div>
            </FormGroup>
        );
    }
}

export default OptionTypeContainer;