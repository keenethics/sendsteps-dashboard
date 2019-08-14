import React from "react";
import { connect } from 'react-redux';
import { setResponseSiteSettings, setResponsePhonenumbers } from './actions';
import BottomSaveBar from "../../../components/common/BottomSaveBar";
import HeaderPanel from "../../../components/common/HeaderPanel";
import { post, get } from "../../../scripts/api";
import { toast } from 'react-toastify';
import ResponseCodeInput from "App/pages/session-before/responsesite-settings/inputs/ResponseCodeInput";
import ResponseCountryInput from "App/pages/session-before/responsesite-settings/inputs/ResponseCountryInput";
import ResponseURLInput from "App/pages/session-before/responsesite-settings/inputs/ResponseURLInput";
import ResponseToggleInput from "App/pages/session-before/responsesite-settings/inputs/ResponseToggleInput";
import ResponseToggleSMSInput from "App/pages/session-before/responsesite-settings/inputs/ResponseToggleSMSInput";
import ResponseInternationalInput from "App/pages/session-before/responsesite-settings/inputs/ResponseInternationalInput";
import ResponsePhonenumberInput from "App/pages/session-before/responsesite-settings/inputs/ResponsePhonenumberInput";
import { Collapse } from 'react-bootstrap';
import './Overview.scss'
import { isValidEmail } from "App/scripts/validationChecker";

class SettingsOverview extends React.Component {

    state = {
        currentPhonenumbers: null,
        isLoading: false
    }

    getPhonenumberList = (isoCode) => {
        get('phonenumbers', 'getNumberByIsoCode',
           {isoCode},
            phonenumbers => this.props.dispatch(
                setResponsePhonenumbers(
                    this.formatPhonenumbers(phonenumbers.content)
                )
            ),
            error =>  console.log(error)
        );
    }

    formatPhonenumbers = numbers => {
        let formatted = {}
        numbers.filter(number => {
            formatted[number.foreignerCompatible] = { ...number };
        })
        this.checkIfShouldChangeForeignerCompatible(formatted);
        return formatted;
    }

    checkIfShouldChangeForeignerCompatible(numbers) {
        const { settings } = this.props;
        if(typeof numbers[settings.phonenumberForeignerCompatible] === 'undefined') {
            const newSettings = settings.phonenumberForeignerCompatible === 2 ? 1 : 2
            this.updateSettings(newSettings, 'phonenumberForeignerCompatible')
        }
    }

    getOverviewSettings = () => {
        get('responsesite', 'getSettingsBasic', 
            { id: this.props.match.params.id },
            result => {
                console.log(result.content);
                const { phonenumberCountryisocode } = result.content;
                this.props.dispatch(setResponseSiteSettings(result.content));
                this.getPhonenumberList(phonenumberCountryisocode);
            },
            error => {
                toast('Unable to fetch settings...' + error.message)
            }
        )
    }

    startLoading = () => {
        this.setState({isLoading: true});
    }

    stopLoading = () => {
        this.setState({isLoading: false});

    }

    saveResponseSiteSettings() {
        const { settings } = this.props;
    
        this.startLoading();

        let newSettings = {
            internetaddressoverwrite: settings.internetaddressoverwrite,
            internetselected: settings.internetselected,
            phonenumberId: settings.phonenumberId,
            textmessagingkeyword: settings.textmessagingkeyword,
            textmessagingselected: settings.textmessagingselected
        };
        post(
            'responsesite', 'updateSettingsBasic',
            { settings: newSettings },
            () => {
                toast("Response settings updated!");
                this.stopLoading();
            },
            error => {
                toast('Unable to update response settings...' + error.message)
                this.stopLoading();

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
        const { isLoading } = this.state;

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
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-horizontal">
                                        <ResponseCodeInput />
                                        <hr/>
                                        <ResponseToggleInput />
                                        <div className="card border-0">
                                            {settings && <Collapse in={!!(settings && !!settings.internetselected)}>    
                                                <span>
                                                    <ResponseURLInput /> 
                                                </span>
                                            </Collapse>} 
                                        </div>
                                        <hr className="mt-0" />
                                        <ResponseToggleSMSInput />
                                        <div className="card border-0">
                                            {settings && <Collapse in={!!(settings && !!settings.textmessagingselected)}> 
                                                <span>                      
                                                    <ResponseCountryInput getPhonenumberList={this.getPhonenumberList} />
                                                    <ResponseInternationalInput getPhonenumberList={this.getPhonenumberList} />
                                                    <ResponsePhonenumberInput />
                                                </span>
                                            </Collapse>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <BottomSaveBar loading={isLoading} onSave={this.saveResponseSiteSettings.bind(this)}/>
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
            responsePhonenumbers: state.responseSettingsReducer.responsePhonenumbers,
            currentUser: state.authReducer.currentUser
        }
    }
)(SettingsOverview);