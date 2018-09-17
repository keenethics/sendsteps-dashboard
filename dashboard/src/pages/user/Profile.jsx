import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchResult } from '../../actions/api';
import BreadCrumbs from '../../pages/base/BreadCrumbs';

class PhonenumberDetails extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchResult('users', 'getSelf'));
    }
    
    render() {

        const { data, match } = this.props;

        return (
            <div>
                <div className="panel panel-default header-panel">  
                    <div className="panel-body">
                        <h1>Your Profile</h1>   
                    </div>
                </div>
                <BreadCrumbs urlList={match.url} />  
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-body">
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
                                        <div className="col-md-6">
                                            <div className="picture-upload">
                                                <div className="current-picture">
                                                    <div className="btn-circle btn-lg">
                                                        <h2>
                                                            <i className="fa fa-lg fa-camera"></i>
                                                        </h2>
                                                    </div>
                                                
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Profile Picture</label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon"><i className="fa fa-images"></i> Browse... </span>
                                                        <input value="" placeholder="(PNG, JPEG, BMP, GIF)" className="form-control" name='picture' />
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
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
                                                    <input value={data && data.firstName} placeholder="Enter your first name" className="form-control" name='firstName' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-xs-12">
                                            <div className="form-group">
                                                <label className="control-label">Last Name</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                                    <input value={data && data.lastName} placeholder="Enter your last name"  className="form-control" name='lastName' />
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
                                                    <input value={data && data.organisation} placeholder="Enter your Organisation" className="form-control" name='organisation' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xs-12">
                                            <div className="form-group">
                                                <label className="control-label">Department</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-warehouse"></i></span>
                                                    <input value={data && data.departmentName} placeholder="Enter your Department" className="form-control" name='department' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6 col-xs-12">
                                            <div className="form-group">
                                                <label className="control-label">Role</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-user-shield"></i></span>
                                                    <input value={data && data.role} className="form-control" disabled="disabled" name='role' />
                                                </div>
                                            </div>
                                        </div>
                
                                        <div className="col-sm-6 col-xs-12">
                                            <div className="form-group">
                                                <label className="control-label">Email</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                                    <input value={data && data.email} placeholder="Enter your E-mail" className="form-control" name='email' />
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
                                                    <input value={data && data.phonenumber} placeholder="Enter your phonenumber" className="form-control" name='phonenumber' />
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
                                                    <input value={data && data.language} placeholder="Enter your prefered language" className="form-control" name='language' />
                                                </div>
                                            </div>
                                        </div>
 
                                        <div className="col-sm-6 col-xs-12">
                                            <div className="form-group">
                                                <label className="control-label">Timezone</label>
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="fas fa-globe"></i></span>
                                                    <input value={data && data.timezone} placeholder="Enter your Timezone" className="form-control" name='timezone' />
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
                                                <span className="input-group-addon"><i className="fas fa-home"></i></span>
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

                                
                            </div>
                        </div>
                    </div>
                
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <button type='button' id='save-btn' className='btn btn-success pull-right'><i className="fa fa-save"></i> Save
                                        </button>
                                        <Link to="/">
                                            <button type='button' id='back-btn' className='btn btn-default'><i className="fa fa-chevron-left"></i> Back
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
        )
    }
} export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
        }
    }
)(PhonenumberDetails);