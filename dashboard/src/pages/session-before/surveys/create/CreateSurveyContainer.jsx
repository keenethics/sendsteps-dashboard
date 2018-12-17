import React, { Component } from 'react';
import SurveyNameContainer from './SurveyNameContainer'
import './CreateSurveyContainer.scss'
import { connect } from 'react-redux';

class CreateSurveyContainer extends Component {

    render() {
        return (
            <div>
                <h3>Conduct a survey among your audience</h3>
                <hr />
                <SurveyNameContainer create={true} />
            </div>
        );
    }
}

export default connect() (CreateSurveyContainer);