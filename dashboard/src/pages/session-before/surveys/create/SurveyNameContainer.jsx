import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux';
import { toast } from 'react-toastify'
import { get } from '../../../../scripts/api';
import { setSurveyData, setSurveyDetails } from '../actions'
import { getValidationState, isValidName } from 'App/scripts/validationChecker';

class SurveyNameContainer extends Component {

    state = {
        surveyName: "",
        error: ""
    }

    isSurveyNameValid = () => {
        return (this.state.surveyName.length > 3 || (this.props.name && this.props.name.length > 3))
    }

    validateSurveyName = () => {
        if(this.isSurveyNameValid() || !this.state.surveyName) {
            this.clearError()
        } else {
            this.setNameError()
        }
    }

    updateName = () => {
        if(this.isSurveyNameValid()) {
            this.props.setName();
        } else {
            this.validateSurveyName();
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
            { name: surveyName },
            result => {
                this.props.dispatch(setSurveyData(result.content))
                toast("Created new Survey!")
                this.clearData()
            },
            err => {
                toast("Unable to create new Survey...")
                console.log(err)
            }
        )
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
            <div className="form-group row px-3">
                    <div className="col-sm-3">
                        <label className="col-form-label col-form-label-sm">Survey Name</label>
                    </div>
                    <div className="col-sm-6">
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-list px-2"></i>
                                </span>
                            </div>
                            <input
                                onBlur={this.validateSurveyName}
                                type="text"
                                value={name ? name : surveyName}
                                placeholder="Enter a Survey name"
                                onChange={this.setSurveyName}
                                className={'form-control ' + getValidationState(name ? name : surveyName, this.isSurveyNameValid)}
                            />
                        </div>
                        {!!error && <span className="invalid-feedback d-inline"><i className="fa fa-exclamation-triangle fa-xs"></i> {error}</span>}
                    </div>
                    {create && 
                    <div className="col-sm-3 text-right">
                        <button type="button" className="btn btn-sm btn-success" disabled={!this.isSurveyNameValid()} onClick={this.checkIfValidAndCreateNew}>
                            <i className="fa fa-plus-square"></i> Create new Survey
                        </button>
                    </div>}
                    {!create && 
                    <div className="col-sm-3 text-right">
                        <button type="button" className="btn btn-sm btn-success" disabled={!this.isSurveyNameValid()} onClick={this.updateName}>
                            <i className="fa fa-save mr-1"></i> Update Survey Name
                        </button>
                    </div>}
            </div>
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