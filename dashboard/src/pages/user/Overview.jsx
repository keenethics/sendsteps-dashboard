import React from "react";
import { connect } from 'react-redux';
import { get, post } from '../../scripts/api';
import { setUserProfileData, setAccountProfileData } from './actions';
import { Panel } from 'react-bootstrap';
import ImageUploadField from "../../components/common/ImageUploadField";
import BottomSaveBar from "../../components/common/BottomSaveBar";
import HeaderPanel from "../../components/common/HeaderPanel";
import { itemPropsToString } from "../../scripts/arrayHelper";
import { isValidEmail, isValidName } from "../../scripts/validationChecker";
import { toast } from "react-toastify";

class ProfileOverview extends React.Component {
    
    state = {
        timezones: null,
        countries: null,
        errors: {
            firstName: null,
            lastName: null,
            email: null
        }
    }

    resetErrors = () => {
        this.setState({
            errors: {
                firstName: null,
                lastName: null,
                email: null
            }
        })
    }

    setError = (error, errorMessage) => {
        this.setState({
            errors: {
                ...errors,
                [error]: errorMessage
            }
        })
    }

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo = () => {
        get('users', 'getProfileData',
            {},
            result => {

                const { timezones, countries, user, account} = result;

                this.setState({ timezones, countries })
                this.props.dispatch(setUserProfileData(user))
                this.props.dispatch(setAccountProfileData(account));

            },
            error => toast(`Unable to fetch user data... [${error}]`)
        )
    }

    updateUserData = (field, e) => {
        let updatedDetails = { ...this.props.userDetails } 
        updatedDetails[field] = e.target.value;
        this.props.dispatch(setUserProfileData(updatedDetails));
    }

    updateAccountData = (field, e) => {
        let updatedDetails = { ...this.props.accountDetails } 
        updatedDetails[field] = e.target.value;
        this.props.dispatch(setAccountProfileData(updatedDetails));
    }

    validateEmail = e => {
        const emailError = !isValidEmail(e.target.value) ? 'Please enter a valid E-mail' : null
        this.setState({errors: { ...this.state.errors, email: emailError}})
    }

    validateFirstName = e => {
        const firstNameError = !isValidName(e.target.value) ? 'Please enter a valid first name (1-255 characters)' : null
        this.setState({errors: { ...this.state.errors, firstName: firstNameError}})
    }

    validateLastName = e => {
        const lastNameError = !isValidName(e.target.value) ? 'Please enter a valid last name (1-255 characters)' : null
        this.setState({errors: { ...this.state.errors, lastName: lastNameError}})
    }

    saveChanges = () => {
        let hasErrors = false
        Object.keys(this.state.errors).forEach(error => {
            if(this.state.errors[error]) {
                hasErrors = true;
            }
        })

        if(!hasErrors) {
            this.updateUserInfo()
        } else {
            toast('Unable to update profile. There are still some invalid fields.')
        }
    }

    updateUserInfo = () => {

        const { userDetails, accountDetails } = this.props;
        const { departmentName, email, firstName, lastName, language, phonenumber, filename } = userDetails
        const { country, postalCode, city, address, university, vatId, timezone } = accountDetails

        post('users', 'updateSelf',
            JSON.stringify({
                firstName,
                lastName,
                email,
                departmentName,
                language,
                phonenumber,
                filename,

                country,
                postalCode,
                city,
                address,
                university,
                timezone,
                vatId
            }),
            () => toast('Profile details updated!'),
            () => toast('Unable to update profile details...')
        )
    }

    render() {

        const { userDetails, accountDetails } = this.props;
        const { timezones, countries, errors } = this.state;

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
                                    <div className={"form-group " + (errors.firstName && "has-error")}>
                                        <label className="control-label">First Name</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input 
                                                onBlur={this.validateFirstName}
                                                onChange={value => this.updateUserData('firstName', value)}
                                                value={itemPropsToString(userDetails, 'firstName')} 
                                                placeholder="Enter your first name" className="form-control"
                                                name='firstName' 
                                            />
                                        </div>
                                        {errors.firstName && <span className="help-block">{errors.firstName}</span>}
                                    </div>
                                </div>

                                <div className="col-sm-6 col-xs-12">
                                    <div className={"form-group " + (errors.lastName && "has-error")}>
                                        <label className="control-label">Last Name</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input 
                                                onBlur={this.validateLastName}
                                                onChange={value => this.updateUserData('lastName', value)}
                                                value={itemPropsToString(userDetails, 'lastName')} 
                                                placeholder="Enter your last name" 
                                                className="form-control" 
                                                name='lastName' />
                                        </div>
                                        {errors.lastName && <span className="help-block">{errors.lastName}</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Organisation</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-building"></i></span>
                                            <input 
                                                onChange={value => this.updateAccountData('university', value)}
                                                value={itemPropsToString(accountDetails, 'university')} 
                                                placeholder="Enter your Organisation" 
                                                className="form-control" 
                                                name='organisation' />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Department</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user-md"></i></span>
                                            <input 
                                                onChange={value => this.updateUserData('departmentName', value)}
                                                value={itemPropsToString(userDetails, 'departmentName')} 
                                                placeholder="Enter your Department" 
                                                className="form-control" 
                                                name='department' />
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
                                            <input 
                                                value={itemPropsToString(userDetails, 'role')} 
                                                className="form-control" 
                                                disabled="disabled" 
                                                name='role' />
                                        </div>
                                    </div>
                                </div>
        
                                <div className="col-sm-6 col-xs-12">
                                    <div className={"form-group " + (errors.email && "has-error")}>
                                        <label className="control-label">Email</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                            <input
                                                onBlur={this.validateEmail}
                                                onChange={value => this.updateUserData('email', value)}
                                                value={itemPropsToString(userDetails, 'email')} 
                                                placeholder="Enter your E-mail" 
                                                className="form-control" 
                                                name='email' />
                                        </div>
                                        {errors.email && <span className="help-block">{errors.email}</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Phonenumber</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                            <input 
                                                onChange={value => this.updateUserData('phonenumber', value)}
                                                value={itemPropsToString(userDetails, 'phonenumber')} 
                                                placeholder="Enter your phonenumber" 
                                                className="form-control" 
                                                name='phonenumber' />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Email Language</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-globe"></i></span>
                                            <select 
                                                onChange={value => this.updateUserData('language', value)}
                                                value={itemPropsToString(userDetails, 'language')} 
                                                className="form-control" id="language">
                                                <option value="nl">Netherlands (Dutch)</option>
                                                <option value="en">English</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3>Invoice Settings</h3>
                                </div>
                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Address</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-map-marker"></i></span>
                                            <input 
                                                onChange={value => this.updateAccountData('address', value)}
                                                value={itemPropsToString(accountDetails, 'address')} 
                                                placeholder="Enter your Address" 
                                                className="form-control" 
                                                name='address' />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Postal Code</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-address-card"></i></span>
                                            <input 
                                                onChange={value => this.updateAccountData('postalCode', value)}
                                                value={itemPropsToString(accountDetails, 'postalCode')} 
                                                placeholder="Enter your Postal Code" 
                                                className="form-control" 
                                                name='postalcode' />
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
                                            <input 
                                                onChange={value => this.updateAccountData('city', value)}
                                                value={itemPropsToString(accountDetails, 'city')} 
                                                placeholder="Enter your City" 
                                                className="form-control" 
                                                name='city' />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">Country</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-flag"></i></span>
                                            <select 
                                                onChange={value => this.updateAccountData('country', value)}
                                                value={itemPropsToString(accountDetails, 'country')} 
                                                className="form-control" 
                                                id="country">
                                                {countries && countries.map(country => {
                                                    return ( <option key={country.isoCode} value={country.isoCode}>{country.name}</option>)
                                                })}
                                            </select>
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
                                            <select 
                                                onChange={value => this.updateAccountData('timezone', value)}
                                                value={itemPropsToString(accountDetails, 'timezone')} 
                                                className="form-control" 
                                                id="timezone">
                                                {timezones && timezones.map(timezone => {
                                                    return ( <option key={timezone.id} value={timezone.identifier}>{timezone.identifier}</option>)
                                                })}
                                            </select>
                                        </div>

  
                                    </div>
                                </div>

                                <div className="col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="control-label">VAT ID</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input 
                                                onChange={value => this.updateAccountData('vatId', value)}
                                                value={itemPropsToString(accountDetails, 'vatId')} 
                                                placeholder="Enter your VAT ID"  
                                                className="form-control" 
                                                name='vat' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Panel.Body>
                    </Panel>
                    <BottomSaveBar onSave={this.saveChanges} />  
                </div>
            </div>
        )
    }
} export default connect(
    (state) => {
        return {
            userDetails: state.userReducer.userDetails,
            accountDetails: state.userReducer.accountDetails
        }
    }
)(ProfileOverview);