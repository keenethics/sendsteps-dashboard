import React, { Component } from 'react';
import { post } from 'App/scripts/api'
import Question from 'App/components/common/questions/Question';
import DeleteIdentificationQuestionModal from './DeleteIdentificationQuestionModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LoadingPlaceholder from 'App/pages/base/LoadingPlaceholder';
import { sortByProperty, swapOrder } from 'App/scripts/arrayHelper';
import { setDeletingIdentificationId } from 'App/pages/session-before/audience-identification/actions';
import { connect } from 'react-redux';
import { Collapse } from 'react-bootstrap';
import { toast } from 'react-toastify';
class IdentificationQuestionWrapper extends Component {

    allowedTypes = {
        textbox: 'Text',
        radio: 'Multiple Choice',
        checkbox: 'Checkbox'
    }

    questionProps = {
        id: 'id',
        text: 'title',
        order: 'fieldIndex',
        type: 'type',
        required: 'isRequired'
    }

    state = {
        questions: null,
        error: null
    }

    componentDidMount() {
        this.getQuestions()
    }

    getQuestions = () => {
        post(
            '',
            'identification/getQuestions',
            { sessionId: this.props.sessionId },
            questions => this.setState({
                questions: sortByProperty(this.questionProps.order, questions), 
                error: null
            }),
            error => this.setState({error, questions: null}) 
        )
    }

    saveQuestion = (question, callBack) => {
        const { id } = this.questionProps;

        post(
            '',
            'identification/createIdentificationQuestion',
            { sessionId: this.props.sessionId, question },
            // instead of empty response update all questions
            questions => {
                // this.setState({optionsExpanded: false})
                // if(!question[id]) {
                //     this.setState({question: this.mapQuestionProps()})
                // }
                this.setQuestions(questions)
                if(callBack) {
                    callBack()
                }
                toast("Question saved!")
            },
            err => {
                // toast("Unable to save identification question")
            }
        )
    }

    deleteQuestion = questionId => {
        this.props.dispatch(setDeletingIdentificationId(questionId));
    }

    setQuestions = questions => {
        this.setState({
            questions: sortByProperty(this.questionProps.order, questions)
        });
    }

    updateOrder = () => {
        const { questions } = this.state
        const idPositions = questions.map(question => question.id);

        post(
            'audienceidentification',
            'updateOrder',
            { idPositions },
            orderedQuestions => this.setState({
                questions: sortByProperty(this.questionProps.order, orderedQuestions), 
                error: null
            }),
            error => console.log(error)
        )
    }

    onDragEnd = result => {
        if(!result.destination) {
            return true;
        }
        this.setState({
            questions: sortByProperty(
                this.questionProps.order,
                swapOrder(
                    this.state.questions,
                    this.questionProps.order,
                    result.source.index,
                    result.destination.index
                )
            )
        }, () => this.updateOrder());
    }

    render() {

        const { questions } = this.state
        
        return (
            <>
                <Collapse timeout={250} in={!!questions}>
                    <div>
                {questions && 
                <>
                    <DragDropContext onDragEnd={res => this.onDragEnd(res)} >
                    <Droppable ignoreContainerClipping={true} droppableId="droppable">                
                        {(provided, snapshot) => <div ref={provided.innerRef}>
                            {questions && questions.map((question, index) => {
                                return (
                                <Draggable draggableId={question.id} index={index + 1} key={question.id}>
                                    {(provided, snapshot) => <> 
                                        <div 
                                        className="drag-item"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                            <Question 
                                                index={index + 1}
                                                
                                                saveQuestion={this.saveQuestion}
                                                deleteQuestion={this.deleteQuestion}
                                                setQuestions={this.setQuestions}

                                                isDragging={snapshot.isDragging} 
                                                isDroppable={!!snapshot.draggingOver} 

                                                questionProps={this.questionProps}
                                                question={question} 
                                                types={this.allowedTypes}
                                            />
                                        </div>
                                    </>}
                                </Draggable>)
                            })}
                        </div>}
                    </Droppable>
                    </DragDropContext>
                    <Question 
                        index={!!questions ? questions.length + 1 : 1}
                        types={this.allowedTypes}
                        questionProps={this.questionProps}
                        setQuestions={this.setQuestions} 
                        saveQuestion={this.saveQuestion}
                    />
                    <DeleteIdentificationQuestionModal setQuestions={this.setQuestions} />
                </>}
                {!questions && <LoadingPlaceholder />}
                </div>
                </Collapse>
            </>
        );
    }
}

export default connect() (IdentificationQuestionWrapper);