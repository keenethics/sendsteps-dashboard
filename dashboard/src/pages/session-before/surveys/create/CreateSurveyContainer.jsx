import React, { Component } from 'react';
import SurveyNameContainer from './SurveyNameContainer'
import './CreateSurveyContainer.scss'
import { ControlLabel } from 'react-bootstrap'
import { connect } from 'react-redux';
import Toggle from 'react-bootstrap-toggle';
class CreateSurveyContainer extends Component {

    isSurveyEnabled = status => {
        return status && status === '1'
    }

    render() {

        const { surveyStatus, surveyURL } = this.props;

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
                    {!surveyStatus && <i className="fa fa-circle-o-notch fa-spin"></i>}
                    {surveyStatus && <Toggle
                        onClick={this.props.toggleSurveyActive}
                        on={<span><i className="fa fa-check"></i> Yes</span>}
                        off={<span><i className="fa fa-times"></i> No</span>}
                        offstyle="default"
                        active={surveyStatus === "1"}
                    />}
                    </div>
                    <div className="col-sm-3 text-center">
                        {this.isSurveyEnabled(surveyStatus) && surveyURL && <>
                            <a target='_blank' href={surveyURL}><i><i className="lh-32 fa fa-external-link"></i> Survey Link</i></a>
                        </>}
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