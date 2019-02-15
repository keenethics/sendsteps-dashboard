import React, { Component } from 'react';
import { get, post } from '../../../../scripts/api'
import IdentificationQuestion from './IdentificationQuestion';
import DeleteIdentificationQuestionModal from './DeleteIdentificationQuestionModal';

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

    render() {

        const { identificationQuestions } = this.state

        return (
            <>
                {identificationQuestions && identificationQuestions.map(question => {
                    return <span key={question.id}>
                        <IdentificationQuestion getIdentificationQuestions={this.getIdentificationQuestions} savedQuestion={question} />
                        <hr/>
                    </span>
                })}
                <IdentificationQuestion getIdentificationQuestions={this.getIdentificationQuestions} />
                <DeleteIdentificationQuestionModal getIdentificationQuestions={this.getIdentificationQuestions} />
            </>
        );
    }
}

export default CreateQuestionContainer;