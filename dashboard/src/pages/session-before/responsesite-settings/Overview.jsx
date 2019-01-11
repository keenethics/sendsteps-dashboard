import React from "react";
import { connect } from 'react-redux';
import { fetchResult} from '../../../actions/api';
import { setResponseSiteSettings, setSelectablePhonenumbers } from './actions';
import { Panel } from 'react-bootstrap';
import ButtonSwitch from '../../../components/common/ButtonSwitch';
import TooltipNotification from '../../../components/common/TooltipNotification';
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import HeaderPanel from "../../../components/common/HeaderPanel";
import { post, get } from "../../../scripts/api";
import { toast } from 'react-toastify';
import './Overview.scss'

class SettingsOverview extends React.Component {

    updateSettings = (value, field) => {
        const newSettings = { ...this.props.settings }
        newSettings[field] = value;
        console.log(newSettings)
        this.props.dispatch(setResponseSiteSettings(newSettings));
    }

    getPhonenumberList = (isoCode, foreignerCompatible) => {
        get('phonenumbers', 'getNumberByIsoCode',
            JSON.stringify({isoCode, foreignerCompatible}),
            result => {
                this.props.dispatch(setSelectablePhonenumbers(result.content))
            },
            error => {
                console.log(error)
            }
        );
    }

    getOverviewSettings = () => {
        let apiParams = JSON.stringify({id: this.props.match.params.id});
        get('responsesite', 'getSettingsBasic', 
            apiParams,
            result => {
                this.props.dispatch(setResponseSiteSettings(result.content));
                this.getPhonenumberList(result.content.phonenumberCountryisocode, result.content.phonenumberForeignerCompatible + 1);
            },
            error => {
                toast(`Unable to fetch settings... [${JSON.stringify(error)}]`)
            }
        )
        this.props.dispatch(fetchResult('responsesite', 'getSettingsBasic', apiParams, setResponseSiteSettings));
    }
    
    componentDidMount() {
        this.getOverviewSettings();
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
        post(
            'responsesite', 'updateSettingsBasic',
            apiParams,
            result => {
                console.log(result)
                toast(result)
            },
            error => {
                console.log(error)
                toast(JSON.stringify(error));
            }
        )
    }

    validateResponseCode = () => {
        get('responsesite', 'checkResponseCode',
            JSON.stringify({
                keyword: this.props.settings.textmessagingkeyword,
                userId: this.props.currentUser.userId
            }),
            result => {
               if(result) {
                   toast('This response code already exists!');
               }
            },
            error => {
                toast(`Unable to check response code... [${JSON.stringify(error)}]`)
            }
        );
    }

    changeCountry = e => {
        this.updateSettings(e.target.value, 'phonenumberCountryisocode')
        this.getPhonenumberList(e.target.value)
    }

    filterInternational = phonenumberList => {
        console.log(phonenumberList)
        if(this.props.settings.phonenumberForeignerCompatible) {
            return phonenumberList.filter(number => {
                return number.foreignerCompatible == "2"
            })
        }
        return phonenumberList
    }

    toggleInternational = () => {
        this.updateSettings(!this.props.settings.phonenumberForeignerCompatible , 'phonenumberForeignerCompatible')
        this.getPhonenumberList(this.props.settings.phonenumberCountryisocode)
    }

    render() {

        const { settings, selectablePhonenumbers } = this.props;
        
        console.log(settings)
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
                                                    <label className="col-sm-3 control-label lh-32">
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
                                                    {settings && 
                                                    <div className="col-sm-6">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="fa fa-barcode"></i>
                                                            </span>
                                                            <input onBlur={this.validateResponseCode} type="text" onChange={e => this.updateSettings(e.target.value, 'textmessagingkeyword')} value={settings.textmessagingkeyword} className="input-lg form-control" placeholder="" />
                                                        </div>
                                                    </div>}
                                                </div>
                                                <hr/>
                                                <div className="form-group">
                                                    <label className="col-sm-3 control-label">
                                                        Response Website <TooltipNotification 
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
                                                    {settings && 
                                                    <div className="col-sm-6">
                                                            <ButtonSwitch onChange={() => this.updateSettings(!settings.internetselected, 'internetselected')} selected={settings.internetselected ? "1" : "0"} />
                                                    </div>}
                                                </div>
                                                <Panel className="panel-no-border" expanded={!!(settings && settings.internetselected)}>
                                                <Panel.Collapse>                                
                                                <div className="form-group">
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
                                                            <input type="text" value={(settings && settings.internetaddressoverwrite) ? settings.internetaddressoverwrite : ""} disabled="disabled" className="form-control" placeholder="" />
                                                        </div>
                                                    </div>
                                                </div>
                                                </Panel.Collapse>
                                                </Panel>
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
                                                        <ButtonSwitch onChange={() => this.updateSettings(!settings.textmessagingselected, 'textmessagingselected')} selected={(settings && settings.textmessagingselected) ? "1" : "0"} />
                                                    </div>
                                                </div>
                                                <Panel className="panel-no-border" expanded={!!(settings && settings.textmessagingselected)}>
                                                <Panel.Collapse>                                
                                                <span>
                                                    <div className="form-group">
                                                        <label className="col-sm-3 control-label">Country <TooltipNotification 
                                                                title={"Country"}
                                                                tooltip={
                                                                    <span className="text-left">
                                                                        <h5>Country </h5>
                                                                        <p>Select the country in which your session will take place. </p>
                                                                        <p>The instruction and question slides will contain the phone number related to your country of selection. This number can be used for those attendees wishing to use SMS as a response method.</p> 
                                                                        <p>Please contact us if your country is not listed.</p>
                                                                    </span>}>
                                                                <i className="fa fa-question-circle"></i>
                                                            </TooltipNotification>
                                                        </label>
                                                        <div className="col-sm-6">
                                                        {settings && settings.countriesList &&
                                                            <div className="input-group">
                                                                <span className="input-group-addon" id="basic-addon1">
                                                                    <i className="fa fa-globe"></i>
                                                                </span>
                                                                <select onChange={this.changeCountry} className="form-control">
                                                                    <option value={null}>-</option>
                                                                    {settings.countriesList.map((country, index) => {
                                                                        return <option key={index} value={country.isoCode}>{country.name}</option>
                                                                    })}
                                                                </select>
                                                            </div>}
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
                                                            <ButtonSwitch onChange={this.toggleInternational} selected={(settings && settings.phonenumberForeignerCompatible) ? "1" : "0"} />
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
                                                        {selectablePhonenumbers &&
                                                        <div className="col-sm-6">
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="fa fa-phone"></i>
                                                                </span>
                                                                <select onChange={this.setCountry} className="form-control">
                                                                    {this.filterInternational(selectablePhonenumbers).map(phonenumber => {
                                                                        return <option key={phonenumber.id} value={phonenumber.id}>{phonenumber.displayText}</option>
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>}
                                                    </div>
                                                </span>
                                                </Panel.Collapse>
                                                </Panel>
                                            </div>
                                        </div>
                                    </div>
                                </Panel.Body>
                            </Panel>
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
            selectablePhonenumbers: state.responseSettingsReducer.selectablePhonenumbers,
            currentUser: state.authReducer.currentUser
        }
    }
)(SettingsOverview);