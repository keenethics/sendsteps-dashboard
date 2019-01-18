import React from "react";
import { connect } from 'react-redux';
import { setResponseSiteSettings } from './actions';
import { Panel } from 'react-bootstrap';
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import HeaderPanel from "../../../components/common/HeaderPanel";
import { post, get } from "../../../scripts/api";
import { toast } from 'react-toastify';
import ResponseCodeInput from "./inputs/ResponseCodeInput";
import ResponseCountryInput from "./inputs/ResponseCountryInput";
import ResponseURLInput from "./inputs/ResponseURLInput";
import ResponseToggleInput from "./inputs/ResponseToggleInput";
import ResponseToggleSMSInput from "./inputs/ResponseToggleSMSInput";
import ResponseInternationalInput from "./inputs/ResponseInternationalInput";
import ResponsePhonenumberInput from "./inputs/ResponsePhonenumberInput";
import './Overview.scss'

class SettingsOverview extends React.Component {

    state = {
        currentPhonenumber: null
    }

    getPhonenumberList = (isoCode, foreignerCompatible) => {
        console.log(JSON.stringify({isoCode, foreignerCompatible}))

        get('phonenumbers', 'getNumberByIsoCode',
            JSON.stringify({isoCode, foreignerCompatible}),
            result => {
                this.setState({currentPhonenumber: result.content})
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
                const { phonenumberCountryisocode, phonenumberForeignerCompatible } = result.content;
                this.props.dispatch(setResponseSiteSettings(result.content));
                this.getPhonenumberList(phonenumberCountryisocode, phonenumberForeignerCompatible);
            },
            error => {
                toast(`Unable to fetch settings... [${JSON.stringify(error)}]`)
            }
        )
    }

    saveResponseSiteSettings() {
        const { settings } = this.props;
    
        let newSettings = {
            internetaddressoverwrite: settings.internetaddressoverwrite,
            internetselected: settings.internetselected,
            phonenumberCountryisocode: settings.phonenumberCountryisocode,
            phonenumberForeignerCompatible: settings.phonenumberForeignerCompatible,
            phonenumberId: settings.phonenumberId,
            textmessagingkeyword: settings.textmessagingkeyword,
            textmessagingselected: settings.textmessagingselected
        };
        post(
            'responsesite', 'updateSettingsBasic',
            JSON.stringify({newSettings}),
            result => {
                toast(result)
            },
            error => {
                console.log(error)
                toast(JSON.stringify(error));
            }
        )
    }

    componentDidMount() {
        this.getOverviewSettings();
    }

    updateSettings = (value, field) => {
        const newSettings = { ...this.props.settings }
        newSettings[field] = value;
        this.props.dispatch(setResponseSiteSettings(newSettings));
    }

    render() {

        const { settings } = this.props;
        const { currentPhonenumber } = this.state
        
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
                                                <ResponseCodeInput />
                                                <hr/>
                                                <ResponseToggleInput />
                                                <Panel className="panel-no-border" expanded={!!(settings && settings.internetselected)}>
                                                    <Panel.Collapse>          
                                                        <ResponseURLInput />                      
                                                    </Panel.Collapse>
                                                </Panel>
                                                <ResponseToggleSMSInput />
                                                <Panel className="panel-no-border" expanded={!!(settings && settings.textmessagingselected)}>
                                                <Panel.Collapse>                                
                                                    <ResponseCountryInput getPhonenumberList={this.getPhonenumberList} />
                                                    <ResponseInternationalInput getPhonenumberList={this.getPhonenumberList} />
                                                    <ResponsePhonenumberInput currentPhonenumber={currentPhonenumber} />
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
            currentUser: state.authReducer.currentUser
        }
    }
)(SettingsOverview);