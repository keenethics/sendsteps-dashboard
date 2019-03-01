import React, { Component } from 'react';
import { get, post } from '../../../../scripts/api'
import SurveyQuestion from './SurveyQuestion';
import { withRouter } from 'react-router-dom'
import DeleteSurveyQuestionModal from './DeleteSurveyQuestionModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class CreateQuestionContainer extends Component {

    state = {
        types: null,
        surveyQuestions: null,
        error: null
    }

    componentDidMount() {
        this.getTypes()
        this.getSurveyQuestions()
    }

    getTypes = () => {
        get(
            'surveys', 
            'getQuestionTypes',
            {},
            types => this.setState({types, error: null, currentType: types[0]}),
            error => this.setState({error, types: null, currentType: null})
        )
    }

    getSurveyQuestions = () => {
        get(
            'surveys',
            'getQuestions',
            JSON.stringify({
                id: this.props.match.params.id,
            }),
            surveyQuestions => this.setState({
                surveyQuestions: this.sortByOrder(surveyQuestions), 
                error: null
            }),
            error => this.setState({
                error, 
                surveyQuestions: null
            }) 
        )
    }

    updateSurveyQuestionOrder = () => {
        const { surveyQuestions } = this.state

        const idPositions = surveyQuestions.map(question => {
            return question.survey_question_id;
        })
        post(
            'surveys',
            'updateOrder',
            JSON.stringify({idPositions, surveyId: this.props.match.params.id}),
            // () => console.log('Order updated'),
            // () => console.log('Can`t update order')
            orderedQuestions => this.setState({
                surveyQuestions: this.sortByOrder(orderedQuestions), 
                error: null
            }),
            // error => this.setState({
            //     error, 
            //     surveyQuestions: null
            // })
        )
    }

    onDragEnd = result => {
        if(!result.destination) {
            return true;
        }

        const surveyQuestions = this.sortByOrder(
            this.swapOrder(
                result.source.index,
                result.destination.index
            )
        )
        this.setState({
            surveyQuestions
        }, () => this.updateSurveyQuestionOrder());
    }

    /*
        Never doing this again
    */
    swapOrder = (sourceOrder, destinationOrder) => {
        const { surveyQuestions } = this.state 
        let newQuestions = [ ...surveyQuestions ]
        const placeholder = newQuestions.splice(sourceOrder - 1, 1)[0]
        placeholder.order = destinationOrder

        newQuestions.forEach((question, index) => {
            let newOrder = index + 1
            if(newOrder >= destinationOrder) {
                newOrder = index + 2
            }
            question.order = newOrder
        })
        newQuestions.push(placeholder)
        return newQuestions;
    }

    sortByOrder = questions => {
        return questions.sort((a, b) => {
            return a.order - b.order
        })
    }

    getLastCount = () => {
        const { surveyQuestions } = this.state;
        return surveyQuestions.length + 1;
    }
    
    render() {

        const { types, surveyQuestions } = this.state


        return (
            <>
                <DragDropContext onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate} onDragEnd={res => this.onDragEnd(res)} >
                    <Droppable ignoreContainerClipping={true} droppableId="droppable">                
                        {(provided, snapshot) => <div ref={provided.innerRef}>
                            {surveyQuestions && types && surveyQuestions.map((question, index) => {
                                return (
                                <Draggable draggableId={question.survey_question_id} index={index + 1} key={question.survey_question_id}>
                                    {(provided, snapshot) => <> 
                                        <div 
                                        className="drag-item"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                            <SurveyQuestion order={question.order} getSurveyQuestions={this.getSurveyQuestions} savedQuestion={question} types={types} />
                                            <hr/>
                                        </div>
                                    </>}
                                </Draggable>)
                            })}
                        </div>}
                    </Droppable>
                </DragDropContext>
                {types && <SurveyQuestion order={surveyQuestions ? this.getLastCount() : 1} getSurveyQuestions={this.getSurveyQuestions} types={types} />}
                <DeleteSurveyQuestionModal getSurveyQuestions={this.getSurveyQuestions} />
            </>
        );
    }
}

export default withRouter(CreateQuestionContainer);