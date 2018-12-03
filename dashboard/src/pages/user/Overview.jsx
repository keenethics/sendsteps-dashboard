import React from "react";
import { connect } from 'react-redux';
import { get } from '../../scripts/api';
import { setProfileData } from './actions';
import { Panel } from 'react-bootstrap';
import ImageUploadField from "../../components/common/ImageUploadField";
import BottomSaveBar from "../../components/common/BottomSaveBar";
import HeaderPanel from "../../components/common/HeaderPanel";

class ProfileOverview extends React.Component {
    
    componentDidMount() {
        get('users', 'getSelf',
            {},
            user => this.props.dispatch(setProfileData(user.content)),
            error => toast(`Unable to fetch user data... [${error}]`)
        )
    }

    render() {

        const { profileDetails } = this.props;

        return (
            <div>
                <HeaderPanel 
                    title={"Your Profile"} 
                    content={<p>On this page you can edit your personal profile.</p>}
                />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            <div className="row">
                                <div className="col-md-6">
                                    <h2>
                                        Edit your user details
                                    </h2>
                                    <p>
                                        Welcome to your personal dashboard! 
                                        Please keep your profile information up-to-date. 
                                        This way you are ensured of receiving system notifications and the delivery of your session results at all times.
                                    </p>
                                </div>
                                <ImageUploadField 
                                    colWidth={6}
                                    labelText={"Profile Picture"}
                                />
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3>Contact Information</h3>
                                </div>
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">First Name</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input value={profileDetails && profileDetails.firstName} placeholder="Enter your first name" className="form-control" name='firstName' />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Last Name</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input value={profileDetails && profileDetails.lastName} placeholder="Enter your last name"  className="form-control" name='lastName' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Organisation</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-building"></i></span>
                                            <input value={profileDetails && profileDetails.organisation} placeholder="Enter your Organisation" className="form-control" name='organisation' />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Department</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user-md"></i></span>
                                            <input value={profileDetails && profileDetails.departmentName} placeholder="Enter your Department" className="form-control" name='department' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Role</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user-times"></i></span>
                                            <input value={profileDetails && profileDetails.role} className="form-control" disabled="disabled" name='role' />
                                        </div>
                                    </div>
                                </div>
        
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Email</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                            <input value={profileDetails && profileDetails.email} placeholder="Enter your E-mail" className="form-control" name='email' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Phonenumber</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                            <input value={profileDetails && profileDetails.phonenumber} placeholder="Enter your phonenumber" className="form-control" name='phonenumber' />
                                        </div>
                                    </div>
                                </div>
                            </div>
            
                            <div className="row">    
                                <div className="col-sm-12">
                                    <h3>Email Settings</h3>
                                </div>
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Language</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                            <input value={profileDetails && profileDetails.language} placeholder="Enter your prefered language" className="form-control" name='language' />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Timezone</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                            <input value={profileDetails && profileDetails.timezone} placeholder="Enter your Timezone" className="form-control" name='timezone' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <h3>Invoice Settings</h3>
                                </div>
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Address</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-map-marker"></i></span>
                                            <input value="" placeholder="Enter your Address" className="form-control" name='address' />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Postal Code</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-address-card"></i></span>
                                            <input value="" placeholder="Enter your Postal Code"  className="form-control" name='postalcode' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">City</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-home"></i></span>
                                            <input value="" placeholder="Enter your City" className="form-control" name='city' />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Country</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-flag"></i></span>
                                            <input value="" placeholder="Enter your Country"  className="form-control" name='country' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Timezone</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                            <input value="" placeholder="Enter your Timezone" className="form-control" name='invoice-timezone' />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">VAT ID</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input value="" placeholder="Enter your VAT ID"  className="form-control" name='vat' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Panel.Body>
                    </Panel>
                    <BottomSaveBar />  
                </div>
            </div>
        )
    }
} export default connect(
    (state) => {
        return {
            profileDetails: state.userReducer.profileDetails
        }
    }
)(ProfileOverview);