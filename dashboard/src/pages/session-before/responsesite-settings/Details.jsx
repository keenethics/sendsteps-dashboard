import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { Panel } from 'react-bootstrap';
import ButtonSwitch from '../../../components/common/ButtonSwitch';
import TooltipNotification from '../../../components/common/TooltipNotification';
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import HeaderPanel from "../../../components/common/HeaderPanel";


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseWebsiteEnabled: true,
            txtSmsEnabled: true,
            internationalAudience: true
        }
    }
    
    componentDidMount() {
        let apiController = 'responsesite';
        let apiFunction = 'getSettingsBasic';
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult(apiController, apiFunction, apiParams));
    }

    toggleInternatinonalAudience(state) {
        this.setState({internationalAudience: state});
    }

    toggleResponseWebsite(state) {
        this.setState({responseWebsiteEnabled: state});
    }

    toggleTxtSms(state) {
        this.setState({txtSmsEnabled: state});
    }
    
    render() {

        const { data, match } = this.props;

        return (
            <div>
                <HeaderPanel 
                    match={match}
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
                                                    {/* Refactor this to single component */}
                                                        Response Code <TooltipNotification 
                                                            title={"Response Code"}
                                                            content={
                                                                <span className="text-left">
                                                                    <h5>Response Code</h5>
                                                                    <p>Formulate a response code to allow audience access to your session. </p>
                                                                    <p>Attendees will use the response code with one of the following response methods:</p> 
                                                                    <ul className="list-group">
                                                                        <li><strong>Web: </strong> For web responses, attendees use the response code as a login to the response website.</li>
                                                                        <br/>
                                                                        <li><strong>SMS: </strong> For SMS responses, attendees will start a SMS response with the response code.</li>
                                                                    </ul>
                                                                </span>}
                                                        />
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="fa fa-barcode"></i>
                                                            </span>
                                                            <input 
                                                                type="text" 
                                                                value={data && data.textmessagingkeyword} 
                                                                disabled={true} 
                                                                className="form-control input-lg" 
                                                                placeholder=""
                                                            />
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">Response Website <TooltipNotification 
                                                            title={"Response Website"}
                                                            content={
                                                                <span className="text-left">
                                                                    <h5>Response Website</h5>
                                                                    <p>Switch this ON and your audience is able to respond via a website.</p>
                                                                    <p>They can open this on any device (Smartphone, tablet, laptop etc.).</p> 
                                                                </span>}
                                                        />
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <ButtonSwitch 
                                                            onChange={this.toggleResponseWebsite.bind(this)} 
                                                            enabled={this.state.responseWebsiteEnabled} 
                                                        />
                                                    </div>
                                                </div>
                                                                                
                                                {this.state.responseWebsiteEnabled && <div className="form-group">
                                                    <label className="col-sm-3 control-label">URL <TooltipNotification 
                                                            title={"URL"}
                                                            content={
                                                                <span className="text-left">
                                                                    <h5>URL</h5>
                                                                    <p>This is the response website URL on which the audience can login to respond to questions. </p>
                                                                    <p>By default, this is sendc.com. Please note that the response website can be fully branded into your style. Click here for more info and prices.</p>
                                                                </span>}
                                                        />
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="fa fa-link"></i>
                                                            </span>
                                                            <input type="text" value={data && data.internetaddressoverwrite} disabled="disabled" className="form-control input-lg" placeholder="" />
                                                        </div>
                                                    </div>
                                                </div>}
                                                <hr/>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">TXT/SMS <TooltipNotification 
                                                            title={"TXT/SMS"}
                                                            content={
                                                                <span className="text-left">
                                                                    <h5>TXT/SMS</h5>
                                                                    <p>Switch this ON and your audience is able to respond via SMS.</p>
                                                                    <p>Select the country you are in and the number will displayed automatically to which your audience can respond.</p> 
                                                                </span>}
                                                        />
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <ButtonSwitch 
                                                            onChange={this.toggleTxtSms.bind(this)} 
                                                            enabled={this.state.txtSmsEnabled}
                                                        />
                                                    </div>
                                                </div>

                                                {this.state.txtSmsEnabled && 
                                                <span>
                                                    <div className="form-group">
                                                        <label className="col-sm-3 control-label">Country <TooltipNotification 
                                                            title={"Country"}
                                                            content={
                                                                <span className="text-left">
                                                                    <h5>Country</h5>
                                                                    <p>Select the country in which your session will take place. </p>
                                                                    <p>The instruction and question slides will contain the phone number related to your country of selection. This number can be used for those attendees wishing to use SMS as a response method.</p> 
                                                                    <p>Please contact us if your country is not listed.</p>
                                                                </span>}
                                                        /></label>
                                                        <div className="col-sm-6">
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-globe"></i>
                                                                </span>
                                                                <input value={data && data.phonenumberCountryisocode} type="text" className="form-control input-lg" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-sm-3 control-label">International Audience <TooltipNotification 
                                                            title={"International Audience"}
                                                            content={
                                                                <span className="text-left">
                                                                    <h5>International Audience</h5>
                                                                    <p>If your session is catered to an international audience then the instruction and question slides will contain the phone number inclusive country code.</p>
                                                                </span>}
                                                        />
                                                        </label>
                                                        <div className="col-sm-6">
                                                            <ButtonSwitch 
                                                                options={["Yes", "No"]} 
                                                                onChange={this.toggleInternatinonalAudience.bind(this)} 
                                                                enabled={this.state.internationalAudience}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="col-sm-3 control-label">Phone number <TooltipNotification 
                                                            title={"Phone number"}
                                                            content={
                                                                <span className="text-left">
                                                                    <h5>Phone number</h5>
                                                                    <p>This phone number will be published on the instruction and question slides and can be used for those attendees wishing to respond via SMS. </p>
                                                                    <p>A SMS response always starts with the response code.</p>
                                                                </span>}
                                                        /></label>
                                                        <div className="col-sm-6">
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-phone"></i>
                                                                </span>
                                                                <input value={data && data.phonenumberId} type="text" className="form-control input-lg" placeholder="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </span>}
                                            </div>
                                        </div>
                                    </div>
                                </Panel.Body>
                            </Panel>
                            <BottomSaveBar />
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
            data: state.apiReducer.data,
            dataHash: state.apiReducer.dataHash
        }
    }
)(Settings);