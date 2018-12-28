import React, { Component } from 'react';
import { get, post } from '../../../../scripts/api'
import SurveyQuestion from './SurveyQuestion';
import { withRouter } from 'react-router-dom'
import DeleteSurveyQuestionModal from './DeleteSurveyQuestionModal';
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
            surveyQuestions => this.setState({surveyQuestions, error: null}),
            error => this.setState({error, surveyQuestions: null}) 
        )
    }

    render() {

        const { types, surveyQuestions } = this.state

        return (
            <>
                {surveyQuestions && types && surveyQuestions.map(question => {
                    return <span key={question.survey_question_id}>
                        <SurveyQuestion getSurveyQuestions={this.getSurveyQuestions} savedQuestion={question} types={types} />
                        <hr/>
                    </span>
                })}
                {types && <SurveyQuestion getSurveyQuestions={this.getSurveyQuestions} types={types} />}
                <DeleteSurveyQuestionModal getSurveyQuestions={this.getSurveyQuestions} />
            </>
        );
    }
}

export default withRouter(CreateQuestionContainer);