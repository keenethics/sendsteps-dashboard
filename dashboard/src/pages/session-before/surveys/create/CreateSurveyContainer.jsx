import React, { Component } from 'react';
import SurveyNameContainer from './SurveyNameContainer'
import './CreateSurveyContainer.scss'
import { connect } from 'react-redux';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import Switch from 'App/components/common/inputs/switch/Switch';

class CreateSurveyContainer extends Component {

    render() {

        const { surveyStatus, surveyURL } = this.props;

        return (
            <div>
                <h3>Conduct a survey among your audience</h3>
                <hr />
                <div className="form-group row px-3">
                    <div className="col-sm-3">
                        <label className="col-form-label col-form-label-sm" >Show Survey</label>
                    </div>
                    <div className="col-sm-6">
                    <Switch
                        offstyle={'secondary'}
                        onClick={this.props.toggleSurveyActive}
                        on={<span><i className="fa fa-check"></i> Yes</span>}
                        off={<span><i className="fa fa-times"></i> No</span>}
                        active={!!surveyStatus}
                    />
                    </div>
                    <div className="col-sm-3 text-right">
                        {!!surveyStatus && !!surveyURL && <>
                            <TooltipNotification placement="left" tooltip={"(Click to open in new tab)"}>
                                <button className="btn btn-sm btn-outline-secondary">
                                    <a target='_blank' href={surveyURL}><i><i className="fa fa-external-link"></i> Survey Link</i></a>
                                </button>
                            </TooltipNotification>
                        </>}
                    </div>
            </div>  
            <hr/>
            <SurveyNameContainer create={true} />
            </div>
        );
    }
}

export default connect() (CreateSurveyContainer);