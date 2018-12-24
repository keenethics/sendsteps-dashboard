import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Collapse, ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { post } from '../../../../scripts/api';
import { toast } from 'react-toastify';
import { setDeletingSurveyQuestionId } from '../actions'
import MultipleChoiceContentForm from './types/MultipleChoiceContentForm';

class SurveyQuestion extends Component {

    state = {
        error: null,
        surveyQuestionName: "",
        currentType: null,
        isRequired: 0,
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
        this.setState({
            currentType: this.getDefaultType(),
            isRequired: 0,
            error: null,
            surveyQuestionName: ""
        })
    }

    getDefaultType() {
        return { 
            survey_question_type_id: 1, 
            question_type: this.props.types[1].question_type
        }
    }

    saveSurveyQuestion = () => {

        const { match, savedQuestion } = this.props;
        const { surveyQuestionName, currentType, isRequired } = this.state

        console.log(JSON.stringify({
            question: surveyQuestionName,
            typeId: currentType.survey_question_type_id,
            required: isRequired,
            surveyId: match.params.id,
            surveyQuestionId: savedQuestion ? savedQuestion.survey_question_id : null
        }))


        post(
            'surveys',
            'createSurveyQuestion',
            JSON.stringify({
                question: surveyQuestionName,
                typeId: currentType.survey_question_type_id,
                required: isRequired,
                surveyId: match.params.id,
                surveyQuestionId: savedQuestion ? savedQuestion.survey_question_id : null
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
                currentType: { 
                    survey_question_type_id: typeId, 
                    question_type: this.props.types[typeId].question_type
                }
            })
        }
    }

    setRequired = isRequired => {
        this.setState({isRequired})
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
    
    editQuestion = () => {
        const { savedQuestion } = this.props
        if(savedQuestion) {
            this.setState({
                surveyQuestionName: savedQuestion.question,
                currentType: { 
                    survey_question_type_id: savedQuestion.survey_question_type_id, 
                    question_type: this.props.types[savedQuestion.survey_question_type_id].question_type
                },
                isRequired: parseInt(savedQuestion.is_required, 10),
                savedQuestion: null
            })
        }
    }

    getQuestionIconClassName = () => {
        const { savedQuestion } = this.props;
        const { currentType } = this.state

        const iconList = [
            'fa-file-text-o', 
            'fa-paragraph', 
            'fa-list-ol', 
            'fa-check', 
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

    // {!savedQuestion &&
    //     <ControlLabel className="lh-32">
    //         {!currentType && "New Question"}
    //         {currentType && currentType.question_type}
    //     </ControlLabel>}
    //     {savedQuestion &&
    //     <ControlLabel className="lh-32">
    //         {types[savedQuestion.survey_question_type_id].question_type}
    //     </ControlLabel>}
    }

    render() {

        const { types, savedQuestion } = this.props
        const { currentType, isRequired, surveyQuestionName } = this.state

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
                                {(surveyQuestionName || !savedQuestion) &&
                                <FormControl
                                    type="text"
                                    value={surveyQuestionName}
                                    placeholder="Type a new question"
                                    onChange={this.setQuestion}
                                />}
                                {(savedQuestion && !surveyQuestionName) && <>
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
            <Collapse in={!!surveyQuestionName}>
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
                {currentType && <>
                    <FormGroup>
                    <div className="row">
                        <div className="col-sm-12">
                            {/* Text Question */}
                            {/* <SurveyTextQuestion /> */}
                            {parseInt(currentType.survey_question_type_id, 10) === 1 && <>
                                <div className="col-sm-6 col-sm-offset-3">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="fa fa-comment-o"></i>
                                        </span>
                                        <FormControl disabled={true} placeholder="Their Answer" />
                                    </div>
                                </div>
                            </>}
                            {/* Paragraph Text */}
                            {/* <SurveyParagraphQuestion /> */}
                            {parseInt(currentType.survey_question_type_id, 10) === 2 && <>
                                <div className="col-sm-6 col-sm-offset-3">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="fa fa-comment-o"></i>
                                        </span>
                                        <FormControl componentClass="textarea" disabled={true} placeholder="Their Longer Answer" />
                                    </div>
                                </div>
                            </>}
                            {/* Multiple Choice */}
                            {/* <SurveyMultipleChoiceQuestion /> */}
                            {parseInt(currentType.survey_question_type_id, 10) === 3 && <>
                                <MultipleChoiceContentForm />
                            </>}
                            {/* Checkbox */}
                            {/* <SurveyCheckboxQuestion /> */}
                            {parseInt(currentType.survey_question_type_id, 10) === 4 && <>

                            </>}
                            {/* Scale */}
                            {/* <SurveyScaleQuestion /> */}
                            {parseInt(currentType.survey_question_type_id, 10) === 5 && <>

                            </>}
                            {/* ExplanationText */}
                            {/* <SurveyExplanationText /> */}{parseInt(currentType.survey_question_type_id, 10) === 6 && <>
                                <div className="col-sm-6 col-sm-offset-3">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <i className="fa fa-list"></i>
                                        </span>
                                        <FormControl componentClass="textarea"  placeholder="Type your text which you would like to show to your audience" />
                                    </div>
                                </div>
                            </>}
                        </div>
                    </div>
                    </FormGroup>
                    {parseInt(currentType.survey_question_type_id, 10) !== 6 &&
                    <FormGroup>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="col-sm-3">
                                    <ControlLabel>Required</ControlLabel>
                                </div>
                                <div className="col-sm-6">
                                    <ButtonToolbar>
                                        <ToggleButtonGroup onChange={this.setRequired} type="radio" value={isRequired} name="options" defaultValue={0}>
                                        <ToggleButton value={0}><i className="fa fa-times"></i> No</ToggleButton>
                                        <ToggleButton value={1}><i className="fa fa-check"></i> Yes</ToggleButton>
                                        </ToggleButtonGroup>
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
                    </>}
                </div>
                </Collapse>
            </>
        );
    }
}

export default withRouter(connect(
) (SurveyQuestion));