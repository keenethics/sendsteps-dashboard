import React, { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap'
import MultipleChoiceContainer from './multiplechoice/MultipleChoiceContainer'
import { generateKey } from '../../../../../scripts/arrayHelper'

class OptionTypeContainer extends Component {
    
    state = {
        options: null
    }

    addOption = () => {
        this.setState({
            options: {
                ...this.state.options,
                [generateKey()]: ""
            }
        })
    }

    deleteOption = key => {
        let { options } = this.state
        if(!(Object.keys(options).length === 1)) {
            delete options[key]
            this.setState({options})
        }        
    }

    setOptionText = (text, optionIndex) =>  {
        let { options } = this.state
        options[optionIndex] = text
        this.setState({ options })
    }

    componentDidMount() {
        let { options } = this.props
        this.setState({
            options: { 
                ...options, 
                [generateKey()]: ""
            }
        })
    }

    isTextQuestion = type => {
        const textTypeIndex = 1
        return parseInt(type.survey_question_type_id, 10) === textTypeIndex
    }

    isParagraphQuestion = type => {
        const paragraphTypeIndex = 2
        return parseInt(type.survey_question_type_id, 10) === paragraphTypeIndex
    }

    isMultipleChoiceQuestion = type => {
        const multipleChoiceTypeIndex = 3
        return parseInt(type.survey_question_type_id, 10) === multipleChoiceTypeIndex
    }

    isCheckboxQuestion = type => {
        const checkboxTypeIndex = 4
        return parseInt(type.survey_question_type_id, 10) === checkboxTypeIndex
    }

    isScaleQuestion = type => {
        const scaleTypeIndex = 5
        return parseInt(type.survey_question_type_id, 10) === scaleTypeIndex
    }

    isExplanationQuestion = type => {
        const explanationTypeIndex = 6
        return parseInt(type.survey_question_type_id, 10) === explanationTypeIndex
    }

    render() {

        const { type } = this.props
        const { options } = this.state

        return (
            <FormGroup>
                <div className="row">
                    <div className="col-sm-12">
                        {this.isTextQuestion(type) && <>
                            <div className="col-sm-6 col-sm-offset-3">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-comment-o"></i>
                                    </span>
                                    <FormControl disabled={true} placeholder="Their Answer" />
                                </div>
                            </div>
                        </>}
                        {this.isParagraphQuestion(type) && <>
                            <div className="col-sm-6 col-sm-offset-3">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-comment-o"></i>
                                    </span>
                                    <FormControl componentClass="textarea" disabled={true} placeholder="Their Longer Answer" />
                                </div>
                            </div>
                        </>}
                        {this.isMultipleChoiceQuestion(type) && <>
                            <MultipleChoiceContainer 
                                options={options} 
                                setOptionText={this.setOptionText}
                                addOption={this.addOption}
                                deleteOption={this.deleteOption}
                            />
                        </>}
                        {this.isCheckboxQuestion(type) && <>

                        </>}
                        {this.isScaleQuestion(type) && <>

                        </>}
                        {this.isExplanationQuestion(type) && <>
                            <div className="col-sm-6 col-sm-offset-3">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-list"></i>
                                    </span>
                                    <FormControl componentClass="textarea" onChange={this.setOptionText}  placeholder="Type your text which you would like to show to your audience" />
                                </div>
                            </div>
                        </>}
                    </div>
                </div>
            </FormGroup>
        );
    }
}

export default OptionTypeContainer;