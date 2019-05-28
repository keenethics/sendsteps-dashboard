import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import OptionTypeContainer from 'App/components/common/questions/types/OptionTypeContainer';
import { generateKey } from 'App/scripts/arrayHelper';
import 'App/components/common/questions/Question.scss';
import Switch from 'App/components/common/inputs/switch/Switch';

class Question extends Component {

    mapQuestionProps = () => {
        const { questionProps } = this.props;
        return {
            [questionProps.id]: null,
            [questionProps.text]: '',
            [questionProps.order]: 1,
            [questionProps.type]: Object.keys(this.props.types)[0],
            [questionProps.required]: false,
            options: { [generateKey()]: ''},
        }
    }

    initialState = () => {
        return {
            question: { ...this.mapQuestionProps() },
            optionsExpanded: false,
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

    /*
        Maps a passed question to state
    */
    questionToState = question => {
        this.setState({ 
            question: { ...question,
                options: { ...question.options, 
                    [generateKey()]: ''
                } 
            } 
        });
    }

    /*
        Resets the state
    */
    resetState = () => {
        this.setState({ ...this.initialState() })
    }

    /*
        Expands the question
    */
    editQuestion = () => {
        this.setState({optionsExpanded: true});
    }

    /*
        Toggles the required property for the question
    */
    setRequired = () => {
        const { required } = this.props.questionProps
        this.updateQuestionProperties({[required]: !this.state.question[required]})
    }

    /*
        Sets the question title
    */
    setQuestionTitle = e => {
        const { text } = this.props.questionProps;
        this.updateQuestionProperties({[text]: e.target.value})
    }

    /*
        Sets the type for the current question and resets the options
    */
    setType = e => {
        const { type } = this.props.questionProps;
        this.updateQuestionProperties({
           [type]: e.target.value, 
           options: this.mapQuestionProps().options
        });
    }

    /*
        Adds a question option by generating an extra key
    */
    addOption = () => {
        this.updateQuestionProperties({options: {
            ...this.state.question.options,
            [generateKey()]: ''
        }})
    }

    /*
        Deletes a specific question option by key
    */
    deleteOption = key => {
        let { options } = this.state.question
        if(!(Object.keys(options).length === 1)) {
            delete options[key]
        }    
        this.updateQuestionProperties({options})
    }

    
    /*
        Updates the question by specific properties
        i.e.: updateQuestionProperties( { title: 'newTitle', type: 1337 } )
    */
    updateQuestionProperties = properties => {
        let { question } = this.state;
        Object.keys(properties).forEach(property => {
            question[property] = properties[property];
        })
        this.setState({question});
    }

    /*
        Deletes a question by calling the deleteQuestion passed property
    */
    deleteQuestion = () => {
        const { question, questionProps } = this.props
        const { id } = questionProps;
        this.props.deleteQuestion(question[id]);       
    }
    
    /*
        Saves a question by calling the saveQuestion passed property
        resets the state after a certain timeout for a smooth animation
        @TODO the animation isn't really smooth
    */
    saveQuestion = () => {
        const { question } = this.state
        const { id } = this.props.questionProps;

        // this.setState({optionsExpanded: false})

        setTimeout(() => {
            if(!question[id]) {
                this.resetState();
            }
        }, 75)
        this.setState({optionsExpanded: false})
        this.props.saveQuestion(question)
       
    }

    /* 
        Resets state after collapsing the 
        questions to prevent graphical issues
    */ 
    waitAndResetState() {
        setTimeout(() => {
            this.resetState()
        }, 500)
    }

    /*
        Returns custom classNames by question type
    */
    getQuestionIconClassName = currentType => {
        const iconList = {
            textbox: 'file-text-o',
            radio: 'list-ol',
            checkbox: 'check-square-o',
            scale: 'balance-scale',
            paragraph: 'paragraph',
            explanation: 'info'
        }
        return 'fa fa-' + iconList[currentType.key]
    }

    /*
        Returns green/yellow background colors based on
        whether a question is being dragged and/or droppable
    */
    getStyleFromDraggableProps = () => {
        const { isDragging, isDroppable } = this.props
        return isDragging 
        ? isDroppable 
            ? {backgroundColor: '#c7ffdb', opacity: 0.5} 
            : {backgroundColor: '#ffe083', opacity: 0.5}
        : {}
    }

    /*
        Determines if a question title should be disabled based
        on whether the question is not new and the options arent expanded
    */
    titleDisabled = () => {
        const { question, optionsExpanded } = this.state;
        const { id } = this.props.questionProps

        return !question[id] ? false : !optionsExpanded
    }

    /*
        Only show when 
        (the question is expanded AND there is a question id) OR 
        (the title is filled in and there is no question id)
    */
    shouldShowSaveButton = () => {
        const { question, optionsExpanded } = this.state
        const { id, text } = this.props.questionProps;
        return ((!!question[id] && optionsExpanded) || (!!question[text].length && !question[id]))
    }

    /*
        Update a question option value by key
    */
    updateOptions = (value, key) => {
        let { options } = this.state.question
        options[key] = value;
        this.updateQuestionProperties({options});
    }

    setOptions = options => {
        this.updateQuestionProperties({options})
    }

    translateToType = (types, actualType) => {
        let currentType = { }
        if(types.hasOwnProperty(actualType)) {
            currentType.key = actualType
            currentType.value = types[actualType];
        } else {
            currentType.key = Object.keys(types)[actualType -1];
            currentType.value = types[Object.keys(types)[actualType - 1]]
        }
        return currentType
    }

    render() {

        const { question, optionsExpanded } = this.state
        const { types, questionProps } = this.props
        const { id, text, required, type } = questionProps
        const currentType = this.translateToType(types, question[type]);

        return (
            <>
            <div className="drag-item-container px-3 pt-3" style={this.getStyleFromDraggableProps()}>
                <div className="form-group row mb-0 pb-3">
                    <div className="col-sm-3">
                        <label className="col-form-label col-form-label-sm">
                            {(!!question[text] || !!question[id]) ? currentType.value : "New Question"}
                        </label>
                    </div>
                    <div className="col-sm-9">
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className={this.getQuestionIconClassName(currentType)}></i>
                                </span>
                            </div>
                            <input className="form-control" 
                                value={question[text]}
                                disabled={this.titleDisabled()}
                                type="text"
                                placeholder="Type a new question"
                                onChange={this.setQuestionTitle}
                            />
                            <div className="input-group-append">
                                {(!question[id] ? false : !optionsExpanded) && <>
                                    <button onClick={this.editQuestion} className="btn btn-sm btn-primary">
                                        <i className="fa fa-pencil"></i> 
                                    </button>
                                </>}
                                {this.shouldShowSaveButton() && <>
                                    <button onClick={this.saveQuestion} className="btn btn-sm btn-success">
                                        <i className="fa fa-check"></i> 
                                    </button>
                                </>}
                                {}
                                {(!!question[id]) && <>
                                    <button onClick={this.deleteQuestion} className="btn btn-sm btn-danger">
                                        <i className="fa fa-trash"></i> 
                                    </button>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
                <Collapse in={optionsExpanded || (!question[id] && !!question[text].length)}>
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
                                        <select className="form-control" placeholder="Select..." defaultValue={currentType.key} onChange={this.setType}>
                                            {Object.keys(types).map(type => {
                                                return <option key={type} value={type}>{types[type]}</option>
                                            })}}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <OptionTypeContainer 
                                currentType={currentType}
                                updateQuestionProperties={this.updateQuestionProperties}
                                question={question} 

                                addOption={this.addOption}
                                updateOptions={this.updateOptions}
                                deleteOption={this.deleteOption}

                                setOptions={this.setOptions}
                            />
                            <div className="form-group row">
                                <div className="col-sm-3">
                                    <label className="col-form-label col-form-label-sm">Required</label>
                                </div>
                                <div className="col-sm-9">
                                    <Switch
                                        offstyle="secondary"
                                        on={<span><i className="fa fa-check"></i> Yes</span>}
                                        off={<span><i className="fa fa-times"></i> No</span>}
                                        active={!!question[required]}
                                        onClick={this.setRequired}
                                        size="sm"
                                    />
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