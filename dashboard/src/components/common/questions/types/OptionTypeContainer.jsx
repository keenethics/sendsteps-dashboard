import React, { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap'
import MultipleChoiceContainer from './multiplechoice/MultipleChoiceContainer'
import ParagraphContainer from './paragraph/ParagraphContainer';
import TextContainer from './text/TextContainer';
import ExplanationContainer from './explanation/ExplanationContainer';
import CheckboxContainer from './checkbox/CheckboxContainer';
import ScaleContainer from './scale/ScaleContainer';

class OptionTypeContainer extends Component {
    
    isTextQuestion = type => {
        const textType = 'textbox'
        return type === textType
    }

    isParagraphQuestion = type => {
        const paragraphType = 'paragraph'
        return type === paragraphType
    }

    isMultipleChoiceQuestion = type => {
        const multipleChoiceType = 'radio'
        return type === multipleChoiceType
    }

    isCheckboxQuestion = type => {
        const checkboxType = 'checkbox'
        return type === checkboxType
    }

    isScaleQuestion = type => {
        const scaleType = 'scale'
        return type === scaleType
    }

    isExplanationQuestion = type => {
        const explanationType = 'explanation'
        return type === explanationType
    }

    render() {

        const { question, currentType } = this.props


        return (
            <FormGroup>
                <div className="row">
                    <div className="col-sm-3">
                    </div>
                        {this.isTextQuestion(currentType.key) && <>
                            <TextContainer />
                        </>}
                        {this.isParagraphQuestion(currentType.key) && <>
                            <ParagraphContainer />
                        </>}
                        {this.isMultipleChoiceQuestion(currentType.key) && <>
                            <MultipleChoiceContainer 
                                options={question.options} 
                                updateOptions={(text, key) => this.props.updateOptions(text, key)}
                                addOption={() => this.props.addOption()}
                                deleteOption={key => this.props.deleteOption(key)}
                            />
                        </>}
                        {this.isCheckboxQuestion(currentType.key) && <>
                            <CheckboxContainer 
                                options={question.options} 
                                updateOptions={(text, key) => this.props.updateOptions(text, key)}
                                addOption={() => this.props.addOption()}
                                deleteOption={key => this.props.deleteOption(key)}
                            />
                        </>}
                        {this.isScaleQuestion(currentType.key) && <>
                            <ScaleContainer
                                options={question.options}
                                addOption={() => this.props.addOption()}
                                setOptions={this.props.setOptions}
                            />
                        </>}
                        {this.isExplanationQuestion(currentType.key) && <>
                            <ExplanationContainer 
                                options={question.options}
                                updateOptions={this.props.updateSingleOption}
                            />
                        </>}
                </div>
            </FormGroup>
        );
    }
}

export default OptionTypeContainer;