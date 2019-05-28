import React, { Component } from 'react';
import { get, post } from '../../../../scripts/api'
import { withRouter } from 'react-router-dom'
import DeleteSurveyQuestionModal from './DeleteSurveyQuestionModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Question from 'App/components/common/questions/Question';
import { sortByProperty, swapOrder } from 'App/scripts/arrayHelper';
import { setDeletingSurveyQuestionId } from 'App/pages/session-before/surveys/actions';
import { connect } from 'react-redux';

class SurveyQuestionWrapper extends Component {

    /*
        These are specified in the same order as in the database
        based on index (Object.keys()) => (1-6)
    */
    allowedTypes = {
        textbox: 'Text',
        paragraph: 'Paragraph',
        radio: 'Multiple Choice',
        checkbox: 'Checkbox',
        scale: 'Scale',
        explanation: 'Explanation Text'
    }

    questionProps = {
        id: 'survey_question_id',
        text: 'question',
        order: 'order',
        type: 'survey_question_type_id',
        required: 'is_required'
    }

    state = {
        questions: null,
        error: null
    }

    componentDidMount() {
        this.getQuestions()
    }

    deleteQuestion = questionId => {
        this.props.dispatch(setDeletingSurveyQuestionId(questionId));
    }

    getQuestions = () => {
        get(
            'surveys',
            'getQuestions',
            { id: this.props.match.params.id },
            questions => this.setState({
                questions: sortByProperty(this.questionProps.order, questions), 
                error: null
            }),
            error => this.setState({
                error, 
                questions: null
            }) 
        )
    }

    saveQuestion = question => {
        question.survey_id = this.props.match.params.id;
        if(isNaN(question.survey_question_type_id)) {
            question.survey_question_type_id = Object.keys(this.allowedTypes).indexOf(question.survey_question_type_id) + 1;
        }
        post(
            'surveys',
            'createSurveyQuestion',
            { question },
            // instead of empty response update all questions
            questions => {
                // this.setState({optionsExpanded: false})
                // if(!question[id]) {
                //     this.setState({question: this.mapQuestionProps()})
                // }
                this.setState({questions})
                // toast("Identification question saved!")
            },
            err => {
                // toast("Unable to save identification question")
            }
        )
    }

    updateOrder = () => {
        const { questions } = this.state

        const idPositions = questions.map(question => {
            return question.survey_question_id;
        })
        post(
            'surveys',
            'updateOrder',
            { idPositions, surveyId: this.props.match.params.id },
            orderedQuestions => this.setState({
                questions: sortByProperty(this.questionProps.order, orderedQuestions), 
                error: null
            }),
            // error => this.setState({
            //     error, 
            //     questions: null
            // })
        )
    }

    onDragEnd = result => {
        if(!result.destination) {
            return true;
        }

        const questions = sortByProperty(
            this.questionProps.order,
            swapOrder(
                this.state.questions,
                this.questionProps.order,
                result.source.index,
                result.destination.index
            )
        )
        this.setState({
            questions
        }, () => this.updateOrder());
    }
    
    render() {

        const { questions } = this.state

        return (
            <>
                <DragDropContext onDragEnd={res => this.onDragEnd(res)} >
                    <Droppable ignoreContainerClipping={true} droppableId="droppable">                
                        {(provided, snapshot) => <div ref={provided.innerRef}>
                            {questions && questions.map((question, index) => {
                                return (
                                <Draggable draggableId={question.survey_question_id} index={index + 1} key={question.survey_question_id}>
                                    {(provided, snapshot) => <> 
                                        <div 
                                        className="drag-item"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                            <Question 
                                                saveQuestion={this.saveQuestion}
                                                deleteQuestion={this.deleteQuestion}
                                                isDroppable={!!snapshot.draggingOver} 
                                                isDragging={snapshot.isDragging} 
                                                getQuestions={this.getQuestions} 
                                                question={question} 
                                                questionProps={this.questionProps}
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
                    saveQuestion={this.saveQuestion}
                    getquestions={this.getQuestions} 
                    questionProps={this.questionProps}
                    types={this.allowedTypes} 
                />
                <DeleteSurveyQuestionModal getQuestions={this.getQuestions} />
            </>
        );
    }
}

export default withRouter(connect() (SurveyQuestionWrapper));