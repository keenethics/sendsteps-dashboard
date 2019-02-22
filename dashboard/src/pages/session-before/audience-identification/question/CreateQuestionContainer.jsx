import React, { Component } from 'react';
import { get, post } from '../../../../scripts/api'
import IdentificationQuestion from './IdentificationQuestion';
import DeleteIdentificationQuestionModal from './DeleteIdentificationQuestionModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class CreateQuestionContainer extends Component {

    state = {
        identificationQuestions: null,
        error: null
    }

    componentDidMount() {
        this.getIdentificationQuestions()
    }

    getIdentificationQuestions = () => {
        post(
            'audienceidentification',
            'getQuestions',
            {},
            identificationQuestions => this.setState({identificationQuestions, error: null}),
            error => this.setState({error, identificationQuestions: null}) 
        )
    }

    updateIdentificationQuestionOrder = () => {
        const { identificationQuestions } = this.state

        const idPositions = identificationQuestions.map(question => {
            return question.id;
        })
        post(
            'audienceidentification',
            'updateOrder',
            JSON.stringify({idPositions}),
            orderedQuestions => this.setState({
                identificationQuestions: this.sortByOrder(orderedQuestions), 
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

        const identificationQuestions = this.sortByOrder(
            this.swapOrder(
                result.source.index,
                result.destination.index
            )
        )
        this.setState({
            identificationQuestions
        }, () => this.updateIdentificationQuestionOrder());
    }

    swapOrder = (sourceOrder, destinationOrder) => {
        const { identificationQuestions } = this.state 
        let newQuestions = [ ...identificationQuestions ]
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
        return questions.sort((a, b) => {
            return a.fieldIndex - b.fieldIndex
        })
    }

    getLastCount = () => {
        const { identificationQuestions } = this.state;
        return identificationQuestions.length + 1;
    }

    render() {

        const { identificationQuestions } = this.state

        return (
            <>
                <DragDropContext onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate} onDragEnd={res => this.onDragEnd(res)} >
                    <Droppable ignoreContainerClipping={true} droppableId="droppable">                
                        {(provided, snapshot) => <div ref={provided.innerRef}>
                            {identificationQuestions && identificationQuestions.map((question, index) => {
                                return (
                                <Draggable draggableId={question.id} index={index + 1} key={question.id}>
                                    {(provided, snapshot) => <> 
                                        <div 
                                        className="drag-item"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                            <IdentificationQuestion order={question.fieldIndex} getIdentificationQuestions={this.getIdentificationQuestions} savedQuestion={question} />
                                            <hr/>
                                        </div>
                                    </>}
                                </Draggable>)
                            })}
                        </div>}
                    </Droppable>
                </DragDropContext>
                <IdentificationQuestion order={identificationQuestions ? this.getLastCount() : 1}  getIdentificationQuestions={this.getIdentificationQuestions} />
                <DeleteIdentificationQuestionModal getIdentificationQuestions={this.getIdentificationQuestions} />
            </>
        );
    }
}

export default CreateQuestionContainer;