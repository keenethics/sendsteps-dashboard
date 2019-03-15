import React, { Component } from 'react';
import { FormGroup, FormControl, Collapse, ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { post, get } from '../../../../scripts/api';
import { toast } from 'react-toastify';
import { setDeletingIdentificationId } from '../actions'
import OptionTypeContainer from './types/OptionTypeContainer';
import { generateKey } from '../../../../scripts/arrayHelper';
import { Toggle } from 'react-bootstrap-toggle';

class IdentificationQuestion extends Component {

    getInitialState = () => {
        return {
            error: null,
            identificationQuestionTitle: "",
            isRequired: 0,
            identificationQuestionOptions: { [generateKey()]: ""},
            optionsExpanded: false,
            types: {
                textbox: 'Text',
                radio: 'Multiple Choice',
                checkbox: 'Checkbox'
            },
            currentType: 'textbox'
        }
    }

    state = {
        ...this.getInitialState()
    }

    resetState = () => {
        this.setState({ ...this.getInitialState() })
    }

    setAllOptions = identificationQuestionOptions => {
        this.setState({identificationQuestionOptions})
    }

    updateSingleOption = e => {
        let { identificationQuestionOptions } = this.state
        identificationQuestionOptions[Object.keys(identificationQuestionOptions)[0]] = e.target.value
        this.setState({identificationQuestionOptions})
    }

    addOption = () => {
        this.setState({
            identificationQuestionOptions: {
                ...this.state.identificationQuestionOptions,
                [generateKey()]: ""
            }
        })
    }

    deleteOption = key => {
        let { identificationQuestionOptions } = this.state
        if(!(Object.keys(identificationQuestionOptions).length === 1)) {
            delete identificationQuestionOptions[key]
            this.setState({identificationQuestionOptions})
        }    
    }

    deleteIdentificationQuestion = () => {
        const { savedQuestion } = this.props
        if(savedQuestion) {
            this.props.dispatch(setDeletingIdentificationId(savedQuestion.id))
        } else {
            this.resetState()
            this.props.getIdentificationQuestions()
            toast("Identification question removed!")
        }
    }

    saveIdentificationQuestion = () => {

        const { savedQuestion, order } = this.props;
        const { identificationQuestionTitle, currentType, isRequired, identificationQuestionOptions } = this.state

        post(
            'audienceidentification',
            'createIdentificationQuestion',
            {
                question: identificationQuestionTitle,
                type: currentType,
                required: isRequired,
                questionId: savedQuestion ? savedQuestion.id : null,
                order,  
                identificationQuestionOptions
            },
            () => {
                this.setState({optionsExpanded: false, identificationQuestionTitle: ""})
                this.waitAndResetState();
                this.props.getIdentificationQuestions();
                toast("Identification question saved!")
            },
            err => {
                toast("Unable to save identification question")
            }
        )
    }

    // Resets state after collapsing the 
    // questions to prevent graphical issues
    waitAndResetState() {
        setTimeout(() => {
            this.resetState()
        }, 250)
    }

    setCurrentType = e => {
        this.setState({
            identificationQuestionOptions: this.getInitialState().identificationQuestionOptions,
            currentType: e.target.value,
        })
    }

    setRequired = isRequired => {
        this.setState({isRequired: parseInt(isRequired, 10)})
    }

    setQuestion = e => {
        if(e.target.value.length < 1) {
            this.state.isRequired = 0;
        }
        this.setState({
            identificationQuestionTitle: e.target.value, 
            isRequired: this.state.isRequired
        })
    }

    getQuestionOptions = () => {

        const { savedQuestion } = this.props;

        get('audienceidentification', 'getQuestionOptions',
            { id: savedQuestion.id },
            identificationQuestionOptions => {
                this.setState({
                    identificationQuestionOptions: { ...identificationQuestionOptions, [generateKey()]: ""},
                    optionsExpanded: true,
                    identificationQuestionTitle: savedQuestion.title,
                    currentType: savedQuestion.type
                })
            },
            error => {
                console.log(error)
                this.setState({error})
            }
        )
    }

    editQuestion = () => {
        const { savedQuestion } = this.props
        if(savedQuestion) {
            this.getQuestionOptions()
        }
    }

    getQuestionIconClassName = () => {
        const { savedQuestion } = this.props;
        const { currentType } = this.state

        const iconList = {
            textbox: 'fa-file-text-o',
            radio: 'fa-list-ol',
            checkbox: 'fa-check-square-o'
        }
 
        if(savedQuestion) {
            return 'fa ' + iconList[savedQuestion.type] 
        }
        if(currentType) {
            return 'fa ' + iconList[currentType]
        }
        return 'fa fa-list'
    }

    updateOptions = (text, optionIndex) => {
        let { identificationQuestionOptions } = this.state
        identificationQuestionOptions[optionIndex] = text
        this.setState({ identificationQuestionOptions })
    }

    render() {

        const { savedQuestion } = this.props
        const { types, currentType, isRequired, identificationQuestionTitle, identificationQuestionOptions, optionsExpanded } = this.state

        return (
            <>
                <div className="form-group row">
                    <div className="col-sm-3">
                        {!savedQuestion &&
                        <label className="col-form-label">
                            {!currentType && "New Question"}
                            {currentType && types[currentType]}
                        </label>}
                        {savedQuestion &&
                        <label className="col-form-label">
                            {types[savedQuestion.type]}
                        </label>}
                    </div>
                    <div className="col-sm-9">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className={this.getQuestionIconClassName()}></i>
                                </span>
                            </div>
                            {(!savedQuestion || optionsExpanded) &&
                            <FormControl
                                type="text"
                                value={identificationQuestionTitle}
                                placeholder="Type a new question"
                                onChange={this.setQuestion}
                            />}
                            {(savedQuestion && !optionsExpanded) && <>
                                <FormControl 
                                    value={savedQuestion.title}
                                    disabled={true}
                                />
                                <div onClick={this.editQuestion} className="input-group-append">
                                    <button className="btn btn-primary"><i className="fa fa-pencil"></i> Edit </button>
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
                <Collapse in={optionsExpanded || (!!identificationQuestionTitle)}>
                    <div>
                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="col-form-label">Type</label>
                            </div>
                            <div className="col-sm-9">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-list"></i>
                                        </span>
                                    </div>
                                    <select className="form-control" placeholder="Select..." defaultValue={savedQuestion && savedQuestion.type} onChange={this.setCurrentType}>
                                        {Object.keys(types).map(type => {
                                            return <option key={type} value={type}>{types[type]}</option>
                                        })}}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {identificationQuestionOptions && 
                        <OptionTypeContainer 
                            setAllOptions={this.setAllOptions}
                            updateOptions={this.updateOptions} 
                            type={currentType} 
                            options={identificationQuestionOptions} 
                            addOption={this.addOption}
                            deleteOption={this.deleteOption}
                            updateSingleOption={this.updateSingleOption}
                        />}
                        <div className="form-group row">
                            <div className="col-sm-3">
                                <label className="col-form-label">Required</label>
                            </div>
                            <div className="col-sm-9">
                                <ButtonToolbar>
                                    {!savedQuestion && 
                                    <ToggleButtonGroup onChange={this.setRequired} type="radio" value={parseInt(isRequired, 10)} name="options" defaultValue={0}>
                                        <ToggleButton value={0}><i className="fa fa-times"></i> No</ToggleButton>
                                        <ToggleButton value={1}><i className="fa fa-check"></i> Yes</ToggleButton>
                                    </ToggleButtonGroup>}
                                    {savedQuestion && 
                                    <ToggleButtonGroup onChange={this.setRequired} type="radio" name="options" defaultValue={0}>
                                        <ToggleButton value={0}><i className="fa fa-times"></i> No</ToggleButton>
                                        <ToggleButton value={1}><i className="fa fa-check"></i> Yes</ToggleButton>
                                    </ToggleButtonGroup>}
                                </ButtonToolbar>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-3">
                            </div>
                            <div className="col-sm-9">
                                <div className="btn btn-outline-success" onClick={this.saveIdentificationQuestion}>
                                    <i className="fa fa-floppy-o"></i> Save Question
                                </div>
                                <button type="button" className="btn btn-outline-danger float-right" onClick={this.deleteIdentificationQuestion} >
                                    <i className="fa fa-trash"></i> Delete Question
                                </button>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </>
        );
    }
}

export default withRouter(connect(
) (IdentificationQuestion));