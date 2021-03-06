import React from 'react';
import InputField from '../../../components/common/InputField';
import HeaderPanel from '../../../components/common/HeaderPanel';
import { post, get } from "../../../scripts/api";
import { toast } from 'react-toastify';
class SessionOverview extends React.Component {
    
    loginAsUser() {
        post(
            'sessions', 'loginAsUser',
            { sessionId: this.props.match.params.id },
            () =>  document.location.href="/",
            error => {
                console.log(error)
                toast('Oops, something went wrong... ' + error.message)
            }
        )
    }
    
    componentDidMount() {
        this.getDetailsSettings();
    }
    
    getDetailsSettings = () => {
        get('sessions', 'getDetails',
            { id: this.props.match.params.id },
            result => {
                console.log(result.content)
                // const { phonenumberCountryisocode } = result.content;
                // this.props.dispatch(setResponseSiteSettings(result.content));
                // this.getPhonenumberList(phonenumberCountryisocode);
            },
            error => {
                toast('Unable to fetch settings... ' + error.message)
            }
        )
    }
    
    render() {
        
        const { settings } = this.props;
        console.log(this.props);
        return (
            <div>
                <HeaderPanel
                    title={"Session Overview Settings"}
                />
                <div className="card">
                    <div className="card-body">        
                        <div className="container-fluid">
                            <div className="row">
                                <button type='button' id="clear-form" className="btn btn-danger pull-right">
                                    <i className="fa fa-trash"></i> Clear fields
                                </button>
                                <button type='button' onClick={this.loginAsUser.bind(this)} className="btn btn-info pull-right">
                                    <i className="fa fa-trash"></i> Login As This User
                                </button>
                                
                                <div className="row">
                                    <div className="col-sm-12">
                                        <InputField 
                                            labelText="Activation Code"
                                            extraLabelText={<small className="text-warning"><i className="fa fa-exclamation-triangle"></i> (Never give this to customers)</small>}
                                            placeholder="Code will appear here..."
                                            leftFaIcon="share-alt"
                                            rightFaIcon="copy"
                                            inputId="activationCode"
                                            readonly={true}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">    
                                            <label className="col-form-label">Password reset url</label>
                                            <div className="input-group">
                                                <div className="btn-group">
                                                    <button id='generatePasswordReset' type='button' className='btn btn-outline-secondary'>
                                                        <i className="fa fa-lock"></i> Generate
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="Url"
                                            placeholder="Url will appear here..."
                                            leftFaIcon="key"
                                            rightFaIcon="copy"
                                            inputId="passwordReset"
                                            readonly={true}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="Start date"
                                            placeholder="YYYY-MM-DD"
                                            leftFaIcon="calendar"
                                            rightFaIcon="times"
                                            inputId="startDate"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="End date"
                                            placeholder="YYYY-MM-DD"
                                            leftFaIcon="calendar"
                                            rightFaIcon="times"
                                            inputId="endDate"
                                        />
                                    </div>
                                </div> 
                                
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">    
                                            <label className="col-form-label">Timezone</label>
                                            <div className="input-group" >
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-clock-o"></i>
                                                    </span>
                                                </div>
                                                <select className="form-control" name='timezone' id='timezone'>
                                                    <option value=''>Select a timezone</option>
                                                    <option value='' > </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="Audience Size"
                                            placeholder="Select audience size"
                                            leftFaIcon="users"
                                            rightFaIcon="times"
                                            inputId="audienceSize"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="Number of Extra Accounts"
                                            placeholder="Select number of extra accounts"
                                            leftFaIcon="user"
                                            rightFaIcon="times"
                                            inputId="extraAccountsTotal"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="Number of Day Accounts"
                                            placeholder="Select number of day accounts"
                                            leftFaIcon="user"
                                            rightFaIcon="times"
                                            inputId="dayAccountsTotal"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">    
                                            <label className="col-form-label">License Type</label>
                                            <div className="input-group">
                                                <div className="btn-group" data-toggle="buttons">
                                                    <label className="btn btn-outline-secondary">
                                                        <div className="btn-group">
                                                            <span className="btn-group-addon"><i className="fa fa-calendar"></i> Yearly</span>
                                                            <input type="radio" id="licenseYearly" name="licenseType" value="yearly" />
                                                        </div>
                                                    </label>
                                                    <label className="btn btn-outline-secondary">
                                                        <div className="btn-group">
                                                            <span className="btn-group-addon"><i className="fa fa-calendar"></i> Monthly</span>
                                                            <input type="radio" id="licenseMonthly" name="licenseType" value="monthly" />
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>

                                <h4>
                                    <label>Day upgrades</label>
                                </h4>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <table className="table" id="daily_list">
                                            <thead>
                                                <tr>
                                                    <th>Start</th>
                                                    <th>End</th>
                                                    <th>Audience</th>
                                                    <th>Confirmed</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>   
                                </div>
                                <hr/>

                                <h4>
                                    <label>User Details</label>
                                </h4>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="User Type"
                                            leftFaIcon="user"
                                            inputId="userRole"
                                            readonly={true}
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="Email address"
                                            leftFaIcon="envelope"
                                            rightFaIcon="times"
                                            placeholder="Select email address"
                                            inputId="useremail"
                                        />
                                    </div> 
                                    
                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="First name"
                                            leftFaIcon="user"
                                            rightFaIcon="times"
                                            placeholder="Select first name"
                                            inputId="firstName"
                                        />
                                    </div>                        

                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="Last name"
                                            leftFaIcon="user"
                                            rightFaIcon="times"
                                            placeholder="Select last name"
                                            inputId="lastName"
                                        />
                                    </div>     

                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="Phone number"
                                            leftFaIcon="phone"
                                            rightFaIcon="times"
                                            placeholder="Select phone number"
                                            inputId="accountPhonenumber"
                                        />
                                    </div>   

                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="University/Company"
                                            leftFaIcon="building"
                                            rightFaIcon="times"
                                            placeholder="Select University/Company"
                                            inputId="university"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="Address"
                                            leftFaIcon="home"
                                            rightFaIcon="times"
                                            placeholder="Select address"
                                            inputId="address"
                                        />
                                    </div>      

                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="Postal code"
                                            leftFaIcon="map-marker"
                                            rightFaIcon="times"
                                            placeholder="Select postal code"
                                            inputId="postalCode"
                                        />
                                    </div>     
                                            
                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="City"
                                            leftFaIcon="location-arrow"
                                            rightFaIcon="times"
                                            placeholder="Select city"
                                            inputId="city"
                                        />
                                    </div>      

                                    <div className="col-sm-6">
                                        <div className="form-group">    
                                            <label className="col-form-label"> Country </label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-globe"></i>
                                                    </span>
                                                </div>
                                                <select className="form-control" name='accountCountry' id='accountCountry'>
                                                        <option value='' > </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>     
                                </div>
                                <hr/>

                                <h4>
                                    <label>Response settings</label>
                                </h4>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="Response Code"
                                            leftFaIcon="mobile"
                                            rightFaIcon="times"
                                            placeholder="Select preferred response code"
                                            inputId="responseCodeInternet"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="col-form-label">Respond via</label>
                                            <div className="input-group">
                                                <div className="btn-group" data-toggle="buttons">
                                                    <label className="btn btn-outline-secondary">
                                                        <div className="btn-group">
                                                            <span className="btn-group-addon"><i className="fa fa-globe"></i> Website</span>
                                                            <input name='internetSelected' type='checkbox'  className='repond-via' />
                                                                
                                                        </div>
                                                    </label>
                                                    <label className="btn btn-outline-secondary">
                                                        <div className="btn-group">
                                                            <span className="btn-group-addon"><i className="fa fa-phone"></i>  SMS</span>
                                                            <input name='textMessagingSelected' type='checkbox'  className='repond-via' />
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <InputField 
                                            labelText="Custom response website"
                                            leftFaIcon="link"
                                            rightFaIcon="times"
                                            placeholder="Response website URL"
                                            inputId="CustomResponseWebsite"
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="col-form-label">Response website country</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-globe"></i>
                                                    </span>
                                                </div>
                                                <select className="form-control" id='phonenumberCountry' name='phonenumberCountry'>
                                                    <option value=''></option>
                                            </select>
                                            </div>  
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="col-form-label">Response phone number</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fa fa-phone"></i>
                                                    </span>
                                                </div>
                                                <select className="form-control" id='phonenumbers' name='phonenumbers'>
                                                    <option value="Loading...">Loading...</option>
                                                </select>
                                            </div>  
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="col-form-label">International audience</label>
                                            <div className="input-group">
                                                <div className="btn-group" data-toggle="buttons">
                                                    <label className="btn btn-outline-secondary ">
                                                        <div className="btn-group">
                                                            <span className="btn-group-addon"><i className="fa fa-check"></i> Yes</span>
                                                            <input type="radio" id="internationalAudienceOn" className='internationalAudience' name="internationalAudience" value="1" />
                                                        </div>
                                                    </label>
                                                    <label className="btn btn-outline-secondary">
                                                        <div className="btn-group">
                                                                <span className="btn-group-addon"><i className="fa fa-times"></i> No</span>
                                                            <input type="radio" id="internationalAudienceOff" className='internationalAudience' name="internationalAudience" value="0" />
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="row">            
                            <div className="col-sm-12">
                                <button type='button' id='save-btn' className='btn btn-success'>
                                    <i className="fa fa-floppy-o"></i>
                                    Save
                                </button>
                                <button type='button' id='back-btn' className='btn btn-outline-secondary pull-right'> 
                                    <i className="fa fa-chevron-left"></i>
                                    Back
                                </button>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        )
    }
} export default SessionOverview;