import React from "react";
import { connect } from 'react-redux';
import { fetchResult, updateAPI } from '../../../actions/api';
import { setField } from '../../../actions/app';
import { setResponseSiteSettings } from './actions';
import { Panel } from 'react-bootstrap';
import ButtonSwitch from '../../../components/common/ButtonSwitch';
import TooltipNotification from '../../../components/common/TooltipNotification';
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import HeaderPanel from "../../../components/common/HeaderPanel";
import InputField from "../../../components/common/InputField";


class SettingsOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseWebsiteEnabled: true,
            txtSmsEnabled: true,
            internationalAudience: true
        }
    }
    
    componentDidMount() {
        let apiParams = JSON.stringify({id: this.props.match.params.id});
        this.props.dispatch(fetchResult('responsesite', 'getSettingsBasic', apiParams, setResponseSiteSettings));
    }
    
    saveResponseSiteSettings() {
        const { settings } = this.props;
        let sentsettings = {
            internetaddressoverwrite: settings.internetaddressoverwrite,
            internetselected: settings.internetselected,
            phonenumberCountryisocode: settings.phonenumberCountryisocode,
            phonenumberForeignerCompatible: settings.phonenumberForeignerCompatible,
            phonenumberId: settings.phonenumberId,
            textmessagingkeyword: settings.textmessagingkeyword,
            textmessagingselected: settings.textmessagingselected
        };
        let apiParams = JSON.stringify({fields : sentsettings});
        console.log(sentsettings);
        this.props.dispatch(updateAPI('responsesite', 'updateSettingsBasic', apiParams));
    }

    render() {

        const { settings } = this.props;

        return (
            <div>
                <HeaderPanel 
                    title={"Response Website Settings"}
                    content={<p>
                        On this page you can edit your session details, 
                        for example the way your audience can respond, 
                        via SMS, a (mobile) website or Twitter. 
                        Click on the question marks to learn more about the different functionalities.
                    </p>}
                />
               
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">  
                            <Panel>
                                <Panel.Body>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-horizontal">
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">
                                                        Response Code <TooltipNotification 
                                                            title={"Response Code"}
                                                            tooltip={
                                                                <span className="text-left">
                                                                    <h5>Response Code</h5>
                                                                    <p>Formulate a response code to allow audience access to your session. </p>
                                                                    <p>Attendees will use the response code with one of the following response methods:</p> 
                                                                    <ul className="list-group">
                                                                        <li><strong>Web: </strong> For web responses, attendees use the response code as a login to the response website.</li>
                                                                        <br/>
                                                                        <li><strong>SMS: </strong> For SMS responses, attendees will start a SMS response with the response code.</li>
                                                                    </ul>
                                                                </span>}>
                                                            <i className="fa fa-question-circle"></i>
                                                        </TooltipNotification>
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <div className="input-group" style={{paddingLeft:"15px"}}>
                                                            <InputField 
                                                                onChange={setField.bind(this, 'textmessagingkeyword')}
                                                                // labelText={"Country"}
                                                                value={settings && settings.textmessagingkeyword}
                                                                leftFaIcon={"barcode"}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">Response Website <TooltipNotification 
                                                            title={"Response Website"}
                                                            tooltip={
                                                                <span className="text-left">
                                                                    <h5>Response Website</h5>
                                                                    <p>Switch this ON and your audience is able to respond via a website.</p>
                                                                    <p>They can open this on any device (Smartphone, tablet, laptop etc.).</p> 
                                                                </span>}>
                                                            <i className="fa fa-question-circle"></i>
                                                        </TooltipNotification>
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <div className="col-sm-6">
                                                            <div className="form-group">
                                                                <ButtonSwitch onChange={setField.bind(this, 'responseWebsiteEnabled')} selected={settings && settings.responseWebsiteEnabled} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                                                
                                                {this.state.responseWebsiteEnabled && <div className="form-group">
                                                    <label className="col-sm-3 control-label">URL <TooltipNotification 
                                                            title={"URL"}
                                                            tooltip={
                                                                <span className="text-left">
                                                                    <h5>URL</h5>
                                                                    <p>This is the response website URL on which the audience can login to respond to questions. </p>
                                                                    <p>By default, this is sendc.com. Please note that the response website can be fully branded into your style. Click here for more info and prices.</p>
                                                                </span>}>
                                                            <i className="fa fa-question-circle"></i>
                                                        </TooltipNotification>
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="fa fa-link"></i>
                                                            </span>
                                                            <input type="text" value={settings && settings.internetaddressoverwrite} disabled="disabled" className="form-control input-lg" placeholder="" />
                                                        </div>
                                                    </div>
                                                </div>}
                                                <hr/>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">TXT/SMS <TooltipNotification 
                                                            title={"TXT/SMS"}
                                                            tooltip={
                                                                <span className="text-left">
                                                                    <h5>TXT/SMS</h5>
                                                                    <p>Switch this ON and your audience is able to respond via SMS.</p>
                                                                    <p>Select the country you are in and the number will displayed automatically to which your audience can respond.</p> 
                                                                </span>}>
                                                            <i className="fa fa-question-circle"></i>
                                                        </TooltipNotification>
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <ButtonSwitch onChange={setField.bind(this, 'txtSmsEnabled')} selected={settings && settings.txtSmsEnabled} />
                                                    </div>
                                                </div>

                                                {this.state.txtSmsEnabled && 
                                                <span>
                                                    <div className="form-group">
                                                        <label className="col-sm-3 control-label">Country 
                                                            <TooltipNotification 
                                                                title={"Country"}
                                                                tooltip={
                                                                    <span className="text-left">
                                                                        <h5>Country</h5>
                                                                        <p>Select the country in which your session will take place. </p>
                                                                        <p>The instruction and question slides will contain the phone number related to your country of selection. This number can be used for those attendees wishing to use SMS as a response method.</p> 
                                                                        <p>Please contact us if your country is not listed.</p>
                                                                    </span>}>
                                                                <i className="fa fa-question-circle"></i>
                                                            </TooltipNotification>
                                                        </label>
                                                        <div className="col-sm-6">
                                                            <div className="input-group" style={{paddingLeft:"15px"}}>
                                                                <InputField 
                                                                    onChange={setField.bind(this, 'phonenumberCountryisocode')}
                                                                    value={settings && settings.phonenumberCountryisocode}
                                                                    leftFaIcon={"globe"}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-sm-3 control-label">International Audience <TooltipNotification 
                                                            title={"International Audience"}
                                                            tooltip={
                                                                <span className="text-left">
                                                                    <h5>International Audience</h5>
                                                                    <p>If your session is catered to an international audience then the instruction and question slides will contain the phone number inclusive country code.</p>
                                                                </span>}>
                                                            <i className="fa fa-question-circle"></i>
                                                        </TooltipNotification>
                                                        </label>
                                                        <div className="col-sm-6">
                                                            <ButtonSwitch onChange={setField.bind(this, 'internationalAudience')} selected={settings && settings.internationalAudience} />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-sm-3 control-label">Phone number <TooltipNotification 
                                                            title={"Phone number"}
                                                            tooltip={
                                                                <span className="text-left">
                                                                    <h5>Phone number</h5>
                                                                    <p>This phone number will be published on the instruction and question slides and can be used for those attendees wishing to respond via SMS. </p>
                                                                    <p>A SMS response always starts with the response code.</p>
                                                                </span>}>
                                                                <i className="fa fa-question-circle"></i>
                                                            </TooltipNotification>
                                                        </label>
                                                        <div className="col-sm-6">
                                                            <div className="input-group" style={{paddingLeft:"15px"}}>
                                                                <InputField 
                                                                    onChange={setField.bind(this, 'phonenumberId')}
                                                                    value={settings && settings.phonenumberId}
                                                                    leftFaIcon={"phone"}
                                                                    // className="form-control input-lg"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </span>}
                                            </div>
                                        </div>
                                    </div>
                                </Panel.Body>
                            </Panel>
                            {/* <BottomSaveBar /> */}
                            <BottomSaveBar onSave={this.saveResponseSiteSettings.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(
    (state) => {
        return {
            settings: state.responseSettingsReducer.settings,
        }
    }
)(SettingsOverview);