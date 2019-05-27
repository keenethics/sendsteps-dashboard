import React, { Component } from 'react';
import { get, post } from '../../../../scripts/api'
import Question from './Question';
import DeleteIdentificationQuestionModal from './DeleteIdentificationQuestionModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LoadingPlaceholder from '../../../base/LoadingPlaceholder';

class CreateQuestionContainer extends Component {

    state = {
        questions: null,
        error: null
    }

    componentDidMount() {
        this.getQuestions()
    }

    getQuestions = () => {
        post(
            'audienceidentification',
            'getQuestions',
            {},
            questions => this.setState({questions, error: null}),
            error => this.setState({error, questions: null}) 
        )
    }

    setQuestions = questions => {
        this.setState({questions})
    }

    updateIdentificationQuestionOrder = () => {
        const { questions } = this.state

        const idPositions = questions.map(question => question.id);

        post(
            'audienceidentification',
            'updateOrder',
            { idPositions },
            orderedQuestions => this.setState({
                questions: this.sortByOrder(orderedQuestions), 
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

        const questions = this.sortByOrder(
            this.swapOrder(
                result.source.index,
                result.destination.index
            )
        )
        this.setState({
            questions
        }, () => this.updateIdentificationQuestionOrder());
    }

    swapOrder = (sourceOrder, destinationOrder) => {
        const { questions } = this.state 
        let newQuestions = [ ...questions ]
        const placeholder = newQuestions.splice(sourceOrder - 1, 1)[0]
        placeholder.fieldIndex = destinationOrder

        newQuestions.forEach((question, index) => {
            let newOrder = index + 1
            if(newOrder >= destinationOrder) {
                newOrder = index + 2
            }
            question.fieldIndex = newOrder
        })
        newQuestions.push(placeholder)
        return newQuestions;
    }

    sortByOrder = questions => {
        return questions.sort((a, b) =>     {
            return a.fieldIndex - b.fieldIndex
        })
    }

    getLastCount = () => {
        const { questions } = this.state;
        return questions.length + 1;
    }

    render() {

        const { questions } = this.state

        return (
            <>
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
                                                setQuestions={this.setQuestions}
                                                isDragging={snapshot.isDragging} 
                                                isDroppable={!!snapshot.draggingOver} 
                                                order={question.fieldIndex} 
                                                question={question} 
                                            />
                                        </div>
                                    </>}
                                </Draggable>)
                            })}
                        </div>}
                    </Droppable>
                    </DragDropContext>
                    <Question order={questions ? this.getLastCount() : 1} setQuestions={this.setQuestions} />
                    <DeleteIdentificationQuestionModal getQuestions={this.getQuestions} />
                </>}
                {!questions && <LoadingPlaceholder />}
            </>
        );
    }
}

export default CreateQuestionContainer;