import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { toast } from 'react-toastify'
import { get } from '../../../../scripts/api';
import { setSurveyData, setSurveyDetails } from '../actions'

class SurveyNameContainer extends Component {

    state = {
        surveyName: "",
        error: ""
    }

    isSurveyNameValid = () => {
        if(this.state.surveyName.length < 3) {
            return false
        }
        return true
    }

    validateSurveyName = () => {
        if(this.isSurveyNameValid() || !this.state.surveyName) {
            this.clearError()
        } else {
            this.setNameError()
        }
    }

    setNameError = () => {
        this.setState({error: "Please enter at least three characters"})
    }

    clearData = () => {
        this.setState({
            error: "",
            surveyName: ""
        })
    }

    clearError = () => {
        this.setState({error: ""})
    }

    setSurveyName = e => {
        this.setState({surveyName: e.target.value})
        this.updateDetailsName(e)
        this.clearError()
    }

    updateDetailsName = e => {
        this.props.dispatch(
            setSurveyDetails(
                {
                    ...this.props.surveyDetails,
                    survey_name: e.target.value
                }
            )
        )
    }

    checkIfValidAndCreateNew = () => {
        if(this.isSurveyNameValid()) { 
            this.createSurvey();
        }
    }

    createSurvey = () => {

        const { surveyName } = this.state;

        get(
            'surveys',
            'addSurvey',
            JSON.stringify({surveyName}),
            newData => {
                this.props.dispatch(setSurveyData(newData))
                toast("Created new Survey!")
                this.clearData()
            },
            err => console.log(err)
        )
    }

    getNameValidationState = () => {
        if(!this.state.surveyName) {
            return null;
        }
        if(this.isSurveyNameValid()) {
            return 'success'
        } else {
            return 'error'
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.name) {
            this.setState({surveyName: nextProps.name})
        }
    }

    render() {

        const { surveyName, error } = this.state
        const { create, name } = this.props

        return (
            <FormGroup validationState={this.getNameValidationState()}>
            <div className="row">
                <div className="col-sm-12">
                    <div className="col-sm-3">
                        <ControlLabel className="lh-32 input-lg">Survey Name</ControlLabel>
                    </div>
                    <div className="col-sm-6">
                        <div className="input-group input-group-lg">
                            <span className="input-group-addon">
                                <i className="fa fa-list"></i>
                            </span>
                            <FormControl
                                onBlur={this.validateSurveyName}
                                type="text"
                                value={name ? name : surveyName}
                                placeholder="Survey Name"
                                onChange={this.setSurveyName}
                            />
                        </div>
                        {!!error && <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> {error}</span>}
                    </div>
                    {create && 
                    <div className="col-sm-3">
                        <Button className="btn-block" bsSize="large" disabled={!this.isSurveyNameValid()} bsStyle="success" onClick={this.checkIfValidAndCreateNew}>
                            <i className="fa fa-plus-square"></i> Create new Survey
                        </Button>
                    </div>}
                </div>
            </div>
            </FormGroup>
        );
    }
}

export default connect(
    state => {
        return {
           surveyDetails: state.surveyReducer.surveyDetails
        }
    }
)(SurveyNameContainer);