import React, { Component } from 'react';
import { FormGroup, FormControl, Collapse, ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { post, get } from 'App/scripts/api';
import { toast } from 'react-toastify';
import { setDeletingIdentificationId } from '../actions'
import OptionTypeContainer from './types/OptionTypeContainer';
import { generateKey } from 'App/scripts/arrayHelper';
import './Question.scss';
import Toggle from 'react-bootstrap-toggle';

class Question extends Component {

    defaultType = 'textbox';

    types = {
        textbox: 'Text',
        radio: 'Multiple Choice',
        checkbox: 'Checkbox'
    }

    getBaseQuestion = () => {
        return {
            id: null,
            title: '',
            isRequired: false,
            fieldIndex: this.props.order,
            type: this.defaultType,
            options: { [generateKey()]: ''},
        }
    }

    initialState = () => {
        return {
            question: { ...this.getBaseQuestion() },
            identificationQuestionTitle: '',
            isRequired: false,
            optionsExpanded: false,
            currentType: this.defaultType,
            types: this.types,
            error: null,
        }
    }

    state = {
        ...this.initialState()
    }

    componentWillMount() {
        if(this.props.question) {
            this.questionToState(this.props.question);
        }
    }

    questionToState = question => {
        this.setState({ 
            question: { ...question,
                options: { ...question.options, 
                    [generateKey()]: ''
                } 
            } 
        });
    }

    resetState = () => {
        this.setState({ ...this.initialState() })
    }

    editQuestion = () => {
        this.setState({optionsExpanded: true});
    }

    setCurrentType = e => {
        this.updateQuestionProperties({type: e.target.value});
    }

    setRequired = () => {
        this.updateQuestionProperties({isRequired: !this.state.question.isRequired})
    }

    setQuestionTitle = e => {
        this.updateQuestionProperties({title: e.target.value})
    }

    setType = e => {
       this.updateQuestionProperties({
           type: e.target.value, 
           options: this.getBaseQuestion().options
        });
    }

    addOption = () => {
        this.updateQuestionProperties({options: {
            ...this.state.question.options,
            [generateKey()]: ''
        }})
    }

    deleteOption = key => {
        let { options } = this.state.question
        if(!(Object.keys(options).length === 1)) {
            delete options[key]
        }    
        this.updateQuestionProperties({options})
    }

    updateQuestionProperties = properties => {
        let { question } = this.state;
        Object.keys(properties).forEach(property => {
            question[property] = properties[property];
        })
        this.setState({question});
    }

    deleteQuestion = () => {
        const { question } = this.props
        if(question) {
            this.props.dispatch(setDeletingIdentificationId(question.id))
        } else {
            this.resetState()
            this.props.getQuestions()
            toast("Identification question removed!")
        }
    }

    saveQuestion = () => {

        const { question } = this.state

        post(
            'audienceidentification',
            'createIdentificationQuestion',
            { question },
            // instead of empty response update all questions
            questions => {
                this.setState({optionsExpanded: false})
                if(!question.id) {
                    this.setState({question: this.getBaseQuestion()})
                }
                setTimeout(() => this.props.setQuestions(questions), 3000)
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

    getQuestionIconClassName = () => {
        const iconList = {
            textbox: 'file-text-o',
            radio: 'list-ol',
            checkbox: 'check-square-o'
        }
        return 'fa fa-' + iconList[this.state.question.type]
    }

    getStyleFromDraggableProps = () => {
        const { isDragging, isDroppable } = this.props
        return isDragging 
        ? isDroppable 
            ? {backgroundColor: '#c7ffdb', opacity: 0.5} 
            : {backgroundColor: '#ffe083', opacity: 0.5}
        : {}
    }

    titleDisabled = () => {
        const { question, optionsExpanded } = this.state;
        return !question.id ? false : !optionsExpanded
    }

    render() {

        const { question, types, optionsExpanded } = this.state

        return (
            <>
            <div className="drag-item-container px-3 pt-3" style={this.getStyleFromDraggableProps()}>
                <div className="form-group row mb-0 pb-3">
                    <div className="col-sm-3">
                        <label className="col-form-label col-form-label-sm">
                            {!!question.title ? types[question.type] : "New Question"}
                        </label>
                    </div>
                    <div className="col-sm-9">
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className={this.getQuestionIconClassName()}></i>
                                </span>
                            </div>
                            <input className="form-control" 
                                value={question.title}
                                disabled={this.titleDisabled()}
                                type="text"
                                placeholder="Type a new question"
                                onChange={this.setQuestionTitle}
                            />
                            {!question.id ? false : !optionsExpanded && <div onClick={this.editQuestion} className="input-group-append">
                                <button className="btn btn-sm btn-primary"><i className="fa fa-pencil"></i> Edit </button>
                            </div>}
                        </div>
                    </div>
                </div>
                <Collapse in={optionsExpanded || (!question.id && !!question.title.length)}>
                    <div>
                        <div>
                            <div className="form-group row">
                                <div className="col-sm-3">
                                    <label className="col-form-label col-form-label-sm">Type</label>
                                </div>
                                <div className="col-sm-9">
                                    <div className="input-group input-group-sm">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-list"></i>
                                            </span>
                                        </div>
                                        <select className="form-control" placeholder="Select..." defaultValue={question.type} onChange={this.setType}>
                                            {Object.keys(types).map(type => {
                                                return <option key={type} value={type}>{types[type]}</option>
                                            })}}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <OptionTypeContainer 
                                updateQuestionProperties={this.updateQuestionProperties}
                                question={question} 
                                addOption={this.addOption}
                                deleteOption={this.deleteOption}
                            />
                            <div className="form-group row">
                                <div className="col-sm-3">
                                    <label className="col-form-label col-form-label-sm">Required</label>
                                </div>
                                <div className="col-sm-9">
                                    <Toggle
                                        offstyle="secondary"
                                        on={<span><i className="fa fa-check"></i> Yes</span>}
                                        off={<span><i className="fa fa-times"></i> No</span>}
                                        active={!!question.isRequired}
                                        onClick={this.setRequired}
                                        size="sm"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-3">
                                </div>
                                <div className="col-sm-9">
                                    <div className="btn btn-sm btn-outline-success" onClick={this.saveQuestion}>
                                        <i className="fa fa-floppy-o"></i> Save Question
                                    </div>
                                    <button type="button" className="btn btn-sm btn-outline-danger float-right" onClick={this.deleteQuestion} >
                                        <i className="fa fa-trash"></i> Delete Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapse>
                <hr className="my-0"/>
                </div>
            </>
        );
    }
}

export default withRouter(connect() (Question));