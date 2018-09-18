import React from 'react';
import BreadCrumbs from '../../../pages/base/BreadCrumbs';

class SessionOverview extends React.Component {
    render() {

        const { match } = this.props;
        
        return (
                <div>
                    <div className="panel panel-default header-panel">  
                        <div className="panel-body">
                            <h1>Session Overview Settings</h1>   
                        </div>
                    </div>
                    <BreadCrumbs urlList={match.url} />
                    <div className="panel panel-default">  
                        <div className="panel-body">
                            <div className="container-fluid">
                                <div className="row">
                                    {/* <div className="col-sm-12">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <h4>
                                                    <label>License Check</label>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="col-sm-3">
                                                    <label>Email Address</label>
                                                </div>
                                                <div className="col-sm-9">
                                                    <input id="emailAddressCheck" value='' />
                                                    <button id='checkAccount' type='button' className='btn btn-primary'>Check</button>
                                                    <button id='createAccount' type='button' className='btn btn-success'>Create</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <h4>
                                        <label></label>
                                        <button type='button' id="clear-form" className="btn btn-danger pull-right"><i className="fa fa-trash"></i> Clear fields</button>
                                    </h4>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Activation code </label>
                                                <small className="text-warning"><i className="fa fa-exclamation-triangle"></i> (Never give this to customers)</small>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-share-alt"></i></span>
                                                    <input className="form-control" id="activationCode" value='' readonly="readonly" />
                                                    <span className="input-group-addon copy-input"><i className="fa fa-files-o"></i></span>
                                                </div>
                                                <span className="activationCode-info help-block hidden"><strong>Oops!</strong> Activation code is invalid!</span>    
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label">Password reset url</label>
                                                <div className="input-group">
                                                    <div className="btn-group">
                                                        <button id='generatePasswordReset' type='button' className='btn btn-default'>
                                                            <i className="fa fa-lock"></i> Generate
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label" id="generated-url">Url</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-key"></i></span>
                                                    <input placeholder="Url will appear here..." id="passwordReset" className="form-control" readonly="readonly"/>
                                                    <span className="input-group-addon copy-input"><i className="fa fa-files-o"></i></span>                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label">Start date</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-calendar-alt"></i></span>
                                                    <input placeholder="YYYY-MM-DD" className="form-control" name="startDate" id="startDate" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label">End date</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-calendar-alt"></i></span>
                                                    <input placeholder="YYYY-MM-DD" className="form-control" name="endDate" id="endDate" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                    
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">    
                                                <label className="control-label">Timezone</label>
                                                <div className="input-group" >
                                                    <span className="input-group-addon"><i className="fa fa-clock"></i></span>
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
                                            <div className="form-group">    
                                                <label className="control-label">Audience Size</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-users"></i></span>
                                                    <input placeholder="Select audience size" className="form-control" name="audienceSize" id="audienceSize" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label">Number of Extra Accounts</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                                    <input placeholder="Select number of extra accounts" className="form-control" name="extraAccountsTotal" id="extraAccountsTotal" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label">Number of Day Accounts</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                                    <input placeholder="Select number of day accounts" className="form-control" name="dayAccountsTotal" id="dayAccountsTotal" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label">License Type</label>
                                                <div className="input-group">
                                                    <div className="btn-group" data-toggle="buttons">
                                                        <label className="btn btn-default">
                                                            <div className="btn-group">
                                                                <span className="btn-group-addon"><i className="far fa-calendar"></i> Yearly</span>
                                                                <input type="radio" id="licenseYearly" name="licenseType" value="yearly" />
                                                            </div>
                                                        </label>
                                                        <label className="btn btn-default">
                                                            <div className="btn-group">
                                                                <span className="btn-group-addon"><i className="far fa-calendar"></i> Monthly</span>
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
                                            <div className="form-group">    
                                                <label className="control-label">User Type</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                                    <input className="form-control" name="userRole"  id="userRole" value='' readonly="readonly" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label"> Email address </label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                                    <input placeholder="Select email address" className="form-control" name="useremail" id="useremail" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div> 
                                        
                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label"> First name </label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                                    <input placeholder="Select first name" className="form-control" name="firstName" id="firstName" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div>                        

                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label"> Last name </label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                                    <input placeholder="Select last name" className="form-control" name="lastName" id="lastName" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div>     

                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label"> Phone number </label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                                    <input placeholder="Select phone number" className="form-control" name="accountPhonenumber" id="accountPhonenumber" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div>   

                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label"> University/Company </label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-building"></i></span>
                                                    <input placeholder="Select University/Company" className="form-control" name="university" id="university" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label"> Address </label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-home"></i></span>
                                                    <input placeholder="Select address" className="form-control" name="address" id="address" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div>      

                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label"> Postal code </label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-map-marker"></i></span>
                                                    <input placeholder="Select postal code" className="form-control" name="postalCode" id="postalCode" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div>     
                                                
                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label"> City </label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-location-arrow"></i></span>
                                                    <input placeholder="Select city" className="form-control" name="city" id="city" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                            </div>
                                        </div>      

                                        <div className="col-sm-6">
                                            <div className="form-group">    
                                                <label className="control-label"> Country </label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-globe"></i></span>
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
                                            <div className="form-group">
                                                <label className="control-label">Response Code</label>
                                                <small className="responseCodeInternet-info text-danger hidden"><i className="fa fa-exclamation"></i> Code is already in use or invalid!</small>    
                                                <div className="input-group phonenumbers-default">
                                                    <span className="input-group-addon"><i className="fa fa-mobile"></i></span>
                                                    <input placeholder="Select preferred response code" name="responseCodeInternet" id="responseCodeInternet" className="form-control response-text"  value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>
                                                
                                                <div className="input-group phonenumbers-list">
                                                    <span className="input-group-addon"><i className="fa fa-mobile"></i></span>
                                                    <select className="form-control response-list" name="responseCodeInternet" id="responseCodeInternet" >
                                                        <option value='' >Select... ()</option>
                                                            <option value=''></option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="control-label">Respond via</label>
                                                <div className="input-group">
                                                    <div className="btn-group" data-toggle="buttons">
                                                        <label className="btn btn-default">
                                                            <div className="btn-group">
                                                                <span className="btn-group-addon"><i className="fa fa-globe"></i> Website</span>
                                                                <input name='internetSelected' type='checkbox'  className='repond-via' />
                                                                    
                                                            </div>
                                                        </label>
                                                        <label className="btn btn-default">
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
                                            <div className="form-group">
                                                <label className="control-label">Custom response website</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-link"></i></span>
                                                    <input placeholder="Response website URL" className="form-control" name="CustomResponseWebsite" value='' />
                                                    <span className="input-group-addon clear-input"><i className="fa fa-times"></i></span>
                                                </div>  
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="control-label">Response website country</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-globe"></i></span>
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
                                                <label className="control-label">Response phone number</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                                    <select className="form-control" id='phonenumbers' name='phonenumbers'>
                                                        <option value="Loading...">Loading...</option>
                                                    </select>
                                                </div>  
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="control-label">International audience</label>
                                                <div className="input-group">
                                                    <div className="btn-group" data-toggle="buttons">
                                                        <label className="btn btn-default ">
                                                            <div className="btn-group">
                                                                <span className="btn-group-addon"><i className="fa fa-check"></i> Yes</span>
                                                                <input type="radio" id="internationalAudienceOn" className='internationalAudience' name="internationalAudience" value="1" />
                                                            </div>
                                                        </label>
                                                        <label className="btn btn-default">
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

                            <div className="panel-footer">
                                <div className="row">            
                                    <div className="col-sm-12">
                                        <button type='button' id='save-btn' className='btn btn-success'>
                                            <i className="fa fa-floppy-o"></i>
                                            Save
                                        </button>
                                        <button type='button' id='back-btn' className='btn btn-default pull-right'> 
                                            <i className="fa fa-chevron-left"></i>
                                            Back
                                        </button>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
} export default SessionOverview;