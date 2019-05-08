import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap'
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
            { name: surveyName },
            newData => {
                this.props.dispatch(setSurveyData(newData))
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
                        <label className="col-form-label">Survey Name</label>
                    </div>
                    <div className="col-sm-6">
                        <div className="input-group input-group-lg">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-list"></i>
                                </span>
                            </div>
                            <input
                                onBlur={this.validateSurveyName}
                                type="text"
                                value={name ? name : surveyName}
                                placeholder="Survey Name"
                                onChange={this.setSurveyName}
                                className={'form-control ' + (this.isSurveyNameValid() ? 'is-valid' : '')}
                            />
                        </div>
                        {!!error && <span className="invalid-feedback"><i className="fa fa-exclamation-triangle fa-xs"></i> {error}</span>}
                    </div>
                    {create && 
                    <div className="col-sm-3 text-right">
                        <button type="button" className="btn btn-lg btn-success" disabled={!this.isSurveyNameValid()} onClick={this.checkIfValidAndCreateNew}>
                            <i className="fa fa-plus-square"></i> Create new Survey
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