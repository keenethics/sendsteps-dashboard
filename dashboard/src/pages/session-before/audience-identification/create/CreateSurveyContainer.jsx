import React, { Component } from 'react';
import SurveyNameContainer from './SurveyNameContainer'
import './CreateSurveyContainer.scss'
import { ToggleButtonGroup, ToggleButton, ControlLabel } from 'react-bootstrap'
import { connect } from 'react-redux';

class CreateSurveyContainer extends Component {

    render() {
        return (
            <div>
                <h3>Conduct a survey among your audience</h3>
                <hr />
                <div className="row">
                    <div className="col-sm-12">
                    <div className="col-sm-3">
                        <ControlLabel className="input-sm" >Show Survey</ControlLabel>
                    </div>
                    <div className="col-sm-6">
                        <ToggleButtonGroup type="radio" name="survey-toggle" defaultValue={0}>
                            <ToggleButton value={0}><i className="fa fa-times"></i> No</ToggleButton>
                            <ToggleButton value={1}><i className="fa fa-check"></i> Yes</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="col-sm-3">
                        Survey Link: ...
                    </div>
                </div>
            </div>  
            <hr/>
            <SurveyNameContainer create={true} />
            </div>
        );
    }
}

export default connect() (CreateSurveyContainer);