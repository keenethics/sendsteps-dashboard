import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Collapse, ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { post } from '../../../../scripts/api';
import { toast } from 'react-toastify';
import { setDeletingSurveyQuestionId } from '../actions'
import OptionTypeContainer from './types/OptionTypeContainer';
import { generateKey } from '../../../../scripts/arrayHelper';

class SurveyQuestion extends Component {

    initialState = {
        error: null,
        surveyQuestionName: "",
        currentType: this.getDefaultType(),
        isRequired: 0,
        surveyQuestionOptions: { [generateKey()]: ""},
        optionsExpanded: false
    }

    state = {
        ...this.initialState
    }

    setAllOptions = surveyQuestionOptions => {
        this.setState({surveyQuestionOptions})
    }

    updateSingleOption = e => {
        let { surveyQuestionOptions } = this.state
        surveyQuestionOptions[Object.keys(surveyQuestionOptions)[0]] = e.target.value
        this.setState({surveyQuestionOptions})
    }

    addOption = () => {
        this.setState({
            surveyQuestionOptions: {
                ...this.state.surveyQuestionOptions,
                [generateKey()]: ""
            }
        })
    }

    deleteOption = key => {
        let { surveyQuestionOptions } = this.state
        if(!(Object.keys(surveyQuestionOptions).length === 1)) {
            delete surveyQuestionOptions[key]
            this.setState({surveyQuestionOptions})
        }    
    }

    deleteSurveyQuestion = () => {
        const { savedQuestion } = this.props
        if(savedQuestion) {
            this.props.dispatch(setDeletingSurveyQuestionId(savedQuestion.survey_question_id))
        } else {
            this.resetState()
            this.props.getSurveyQuestions()
            toast("Survey question removed!")
        }
    }

    resetState = () => {
        this.setState({ ...this.initialState })
    }

    getDefaultType() {
        return { 
            survey_question_type_id: 1, 
            question_type: this.props.types[1].question_type
        }
    }

    saveSurveyQuestion = () => {

        const { match, savedQuestion } = this.props;
        const { surveyQuestionName, currentType, isRequired, surveyQuestionOptions } = this.state

        post(
            'surveys',
            'createSurveyQuestion',
            JSON.stringify({
                question: surveyQuestionName,
                typeId: currentType.survey_question_type_id,
                required: isRequired,
                surveyId: match.params.id,
                surveyQuestionId: savedQuestion ? savedQuestion.survey_question_id : null,
                surveyQuestionOptions
            }),
            () => {
                this.resetState();
                this.props.getSurveyQuestions();
                toast("Survey question saved!")
            },
            err => {
                console.log(err)
                toast("Unable to save survey question")
            }
        )
    }

    componentWillMount() {
        this.setState({
            currentType: this.getDefaultType()
        })
    }

    setCurrentType = e => {
        const typeId = e.target.value
        if(this.props.types) {
            this.setState({
                surveyQuestionOptions: this.initialState.surveyQuestionOptions,
                currentType: { 
                    survey_question_type_id: typeId, 
                    question_type: this.props.types[typeId].question_type
                },
            })
        }
    }

    setRequired = isRequired => {
        console.log(isRequired)
        this.setState({isRequired: parseInt(isRequired, 10)})
    }

    setQuestion = e => {
        if(e.target.value.length < 1) {
            this.state.isRequired = 0;
        }
        this.setState({
            surveyQuestionName: e.target.value, 
            isRequired: this.state.isRequired
        })
    }

    getQuestionOptions = () => {

        const { savedQuestion, types } = this.props;

        post('surveys', 'getQuestionOptions',
            JSON.stringify({id: savedQuestion.survey_question_id}),
            surveyQuestionOptions => {
                this.setState({
                    surveyQuestionOptions: { ...surveyQuestionOptions, [generateKey()]: ""},
                    optionsExpanded: true,
                    surveyQuestionName: savedQuestion.question,
                    currentType: {
                        survey_question_type_id: savedQuestion.survey_question_type_id, 
                        question_type: types[savedQuestion.survey_question_type_id].question_type
                    }
                })
            },
            error => this.setState({error})
        )
    }

    editQuestion = () => {
        const { savedQuestion, types } = this.props
        if(savedQuestion && types) {
            this.getQuestionOptions()
        }
    }

    getQuestionIconClassName = () => {
        const { savedQuestion } = this.props;
        const { currentType } = this.state

        const iconList = [
            'fa-file-text-o', 
            'fa-paragraph', 
            'fa-list-ol', 
            'fa-check-square-o', 
            'fa-balance-scale', 
            'fa-comment'
        ]
 
        if(savedQuestion) {
            return 'fa ' + iconList[savedQuestion.survey_question_type_id - 1] 
        }
        if(currentType) {
            return 'fa ' + iconList[currentType.survey_question_type_id - 1]
        }
        return 'fa fa-list'
    }

    updateOptions = (text, optionIndex) => {
        let { surveyQuestionOptions } = this.state
        surveyQuestionOptions[optionIndex] = text
        this.setState({ surveyQuestionOptions })
    }

    render() {

        const { types, savedQuestion } = this.props
        const { currentType, isRequired, surveyQuestionName, surveyQuestionOptions, optionsExpanded } = this.state

        console.log(surveyQuestionOptions)

        return (
            <>
            <FormGroup validationState={null}>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-3">
                            {!savedQuestion &&
                            <ControlLabel className="lh-32">
                                {!currentType && "New Question"}
                                {currentType && currentType.question_type}
                            </ControlLabel>}
                            {savedQuestion &&
                            <ControlLabel className="lh-32">
                                {types[savedQuestion.survey_question_type_id].question_type}
                            </ControlLabel>}
                        </div>
                        <div className="col-sm-6">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className={this.getQuestionIconClassName()}></i>
                                </span>
                                {(!savedQuestion || optionsExpanded) &&
                                <FormControl
                                    type="text"
                                    value={surveyQuestionName}
                                    placeholder="Type a new question"
                                    onChange={this.setQuestion}
                                />}
                                {(savedQuestion && !optionsExpanded) && <>
                                <FormControl 
                                    value={savedQuestion.question}
                                    disabled={true}
                                />
                                <div onClick={this.editQuestion} className="input-group-addon btn btn-primary">
                                    <i className="fa fa-pencil"></i> Edit
                                </div>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </FormGroup>
            <Collapse in={optionsExpanded || (!!surveyQuestionName)}>
                <div>
                <FormGroup>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-3">
                                <ControlLabel>Type</ControlLabel>
                            </div>
                            <div className="col-sm-6">
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-list"></i>
                                    </span>
                                    {types &&
                                    <FormControl defaultValue={savedQuestion && savedQuestion.survey_question_type_id} onChange={this.setCurrentType} componentClass="select" placeholder="select">
                                        {Object.keys(types).map(typeId => {
                                            return <option key={typeId} value={typeId}>{types[typeId].question_type}</option>
                                        })}}
                                    </FormControl>}
                                </div>
                            </div>
                        </div>
                    </div>
                </FormGroup>
                {(currentType && surveyQuestionOptions) && 
                <OptionTypeContainer 
                    setAllOptions={this.setAllOptions}
                    updateOptions={this.updateOptions} 
                    type={currentType} 
                    options={surveyQuestionOptions} 
                    addOption={this.addOption}
                    deleteOption={this.deleteOption}
                    updateSingleOption={this.updateSingleOption}
                />}
                {parseInt(currentType.survey_question_type_id, 10) !== 6 &&
                <FormGroup>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-3">
                                <ControlLabel>Required</ControlLabel>
                            </div>
                            <div className="col-sm-6">
                                <ButtonToolbar>
                                    {!savedQuestion && <ToggleButtonGroup onChange={this.setRequired} type="radio" value={parseInt(isRequired, 10)} name="options" defaultValue={0}>
                                        <ToggleButton value={0}><i className="fa fa-times"></i> No</ToggleButton>
                                        <ToggleButton value={1}><i className="fa fa-check"></i> Yes</ToggleButton>
                                    </ToggleButtonGroup>}
                                    {savedQuestion && <ToggleButtonGroup onChange={this.setRequired} type="radio" value={savedQuestion.isRequired} name="options" defaultValue={0}>
                                        <ToggleButton value={0}><i className="fa fa-times"></i> No</ToggleButton>
                                        <ToggleButton value={1}><i className="fa fa-check"></i> Yes</ToggleButton>
                                    </ToggleButtonGroup>}
                                </ButtonToolbar>
                            </div>
                        </div>
                    </div>
                </FormGroup>}
                <FormGroup>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-6 col-sm-offset-3">
                                <Button onClick={this.saveSurveyQuestion} bsStyle="success">
                                    <i className="fa fa-floppy-o"></i> Save Question
                                </Button>
                                <Button className="pull-right" onClick={this.deleteSurveyQuestion} bsStyle="danger">
                                    <i className="fa fa-trash"></i> Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </FormGroup>
                </div>
                </Collapse>
            </>
        );
    }
}

export default withRouter(connect(
) (SurveyQuestion));