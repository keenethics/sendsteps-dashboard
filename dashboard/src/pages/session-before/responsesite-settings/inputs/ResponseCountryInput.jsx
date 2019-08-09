import React, { Component } from 'react';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { connect } from 'react-redux';
import { setResponseSiteSettings } from '../actions';

class ResponseCountryInput extends Component {

    updateSettings = (value, field) => {
        const newSettings = { ...this.props.settings }
        newSettings[field] = value;
        this.props.dispatch(setResponseSiteSettings(newSettings));
    }

    changeCountry = e => {
        this.updateSettings(e.target.value, 'phonenumberCountryisocode')
        this.props.getPhonenumberList(e.target.value, this.props.settings.phonenumberForeignerCompatible)
    }

    render() {

        const { settings } = this.props;

        return (
            <div className="form-group row">
                <label className="col-sm-3 col-form-label col-form-label-sm text-right">Country <TooltipNotification 
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
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-globe"></i>
                            </span>
                        </div>
                        <select onChange={this.changeCountry} value={settings.phonenumberCountryisocode} className="form-control">
                            <option value={"--"}>- Other</option>
                            {settings.countriesList.map((country, index) => {
                                return <option key={index} value={country.isoCode}>{country.name}</option>
                            })}
                        </select>
                    </div>}
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            settings: state.responseSettingsReducer.settings
        }
    }
)(ResponseCountryInput);