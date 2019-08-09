import React from 'react';
import { connect } from 'react-redux';
import { get, post } from 'App/scripts/api';
import { setUserProfileData, setAccountProfileData } from './actions';
import { signOut } from 'App/actions/auth';
import ImageUploadField from 'App/components/common/ImageUploadField';
import BottomSaveBar from 'App/components/common/BottomSaveBar';
import HeaderPanel from 'App/components/common/HeaderPanel';
import { itemPropsToString } from 'App/scripts/arrayHelper';
import { isValidEmail, isValidName } from 'App/scripts/validationChecker';
import { toast } from 'react-toastify';
import { addToLocalStorage } from 'App/scripts/localStorage';
import { addCookieValues } from 'App/scripts/cookieStorage';
import { setUser } from "App/actions/auth";

class ProfileOverview extends React.Component {
  state = {
    isUpdating: false,
    timezones: null,
    countries: null,
    errors: {
      firstName: null,
      lastName: null,
      email: null
    },
    disabledBtn: false
  };

  resetErrors = () => {
    this.setState({
      errors: {
        firstName: null,
        lastName: null,
        email: null
      }
    });
  };

  setError = (error, errorMessage) => {
    this.setState({
      errors: {
        ...errors,
        [error]: errorMessage
      }
    });
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    get(
      'users',
      'getProfileData',
      {},
      result => {
        const { timezones, countries, user, account } = result;

        this.setState({ timezones, countries });
        this.props.dispatch(setUserProfileData(user));
        this.props.dispatch(setAccountProfileData(account));
      },
      error => {
        toast(`Unable to fetch user data... [${error}]`);
        console.log(`Unable to fetch user data... [${JSON.stringify(error)}]`);
      }
    );
  };

  updateUserData = (field, e) => {
    let updatedDetails = { ...this.props.userDetails };
    updatedDetails[field] = e.target.value;
    this.props.dispatch(setUserProfileData(updatedDetails));
  };

  updateAccountData = (field, e) => {
    let updatedDetails = { ...this.props.accountDetails };
    updatedDetails[field] = e.target.value;
    this.props.dispatch(setAccountProfileData(updatedDetails));
  };

  validateEmail = e => {
    const emailError = !isValidEmail(e.target.value) ? 'Please enter a valid E-mail' : null;
    this.setState({ errors: { ...this.state.errors, email: emailError } });
  };

  validateFirstName = e => {
    const firstNameError = !isValidName(e.target.value)
      ? 'Please enter a valid first name (1-255 characters)'
      : null;
    this.setState({ errors: { ...this.state.errors, firstName: firstNameError } });
  };

  validateLastName = e => {
    const lastNameError = !isValidName(e.target.value)
      ? 'Please enter a valid last name (1-255 characters)'
      : null;
    this.setState({ errors: { ...this.state.errors, lastName: lastNameError } });
  };

  setImage = src => {
    let updatedDetails = { ...this.props.userDetails };
    updatedDetails['filename'] = src;
    this.props.dispatch(setUserProfileData(updatedDetails));
  };

  saveChanges = () => {
    let hasErrors = false;
    Object.keys(this.state.errors).forEach(error => {
      if (this.state.errors[error]) {
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      this.setState({ disabledBtn: true });
      this.updateUserInfo();
    } else {
      toast('Unable to update profile. There are still some invalid fields.');
    }
  };

  handleDeleteUser = () => {
    post(
      '',
      'deleteUser',
      {
        id: this.props.userDetails.id
      },
      result => {
        // Signing user out
        this.props.dispatch(signOut());
      },
      error => {
        console.log(error);
        toast('Unable to delete profile. Try again later');
      }
    );
  };

  propsToFormData = (formData, properties) => {
      for ( var key in properties ) {
        if (properties[key] !== null && !formData.has(key)) {
          formData.append(key, properties[key]);
        }
      }
    return formData;
  };

  updateUserInfo = () => {
    const { userDetails, accountDetails } = this.props;
    const {
      id,
      departmentName,
      email,
      firstName,
      lastName,
      language,
      phonenumber,
      filename
    } = userDetails;
    const { country, postalCode, city, address, university, vatId, timezone } = accountDetails;

    let paramsData = {
      id,
      firstName,
      lastName,
      email,
      departmentName,
      language,
      phonenumber,
      country,
      postalCode,
      city,
      address,
      university,
      timezone,
      vatId
    };

    if (filename instanceof FormData) {
      paramsData = this.propsToFormData(filename, paramsData);
    } else {
      paramsData.filename = filename;
    }

    post(
      'users',
      'updateUserProfile',
      paramsData,
      result => {
        this.setState({ disabledBtn: false });
        if (result.fileUrl) this.setImage(result.fileUrl);
        if (result.token) {
          if (!addToLocalStorage('token', result.token)) {
            if (!addCookieValues('SSTToken', result.token, 48)) {
              toast(
                'Unable to save user key to LocalStorage/Cookies, please enable these settings in your browser before logging in.'
              );
            }
          }
        }
        if (result.errors) {
          return toast(
            `Unable to save: ${Object.keys(result.errors)
              .map(key => result.errors[key])
              .join('; ')}`
          );
        }

        return toast('Profile details updated!');
      },
      ({ error }) => {
        this.setState({ disabledBtn: false });
        toast(`Unable to update profile details... ${error}`);
      }
    );
  };


    getProfileData = (params, onSuccess, onFail) => {
        const functionName = 'getProfileData'
        get(
            this.controller,
            functionName,
            { ...params },
            res => onSuccess(res),
            err => onFail(err)
        );
    }

    setBase64File = base64String => {
        let updatedDetails = { ...this.props.userDetails } 
        updatedDetails['base64String'] = base64String;
        this.props.dispatch(setUserProfileData(updatedDetails));
    }

    clearImage = () => {
        let updatedDetails = { ...this.props.userDetails } 
        updatedDetails['base64String'] = '';
        updatedDetails['filename'] = '';
        this.props.dispatch(setUserProfileData(updatedDetails));
    }

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // Use 'react-image-crop' for Images
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  render() {
    const { userDetails, accountDetails } = this.props;
    const { timezones, countries, errors, disabledBtn, isUpdating } = this.state;
    
    const isLoaded = (!!userDetails && !!accountDetails)

        return (
            <div>
                <HeaderPanel 
                    title={"Your Profile"} 
                    content={<p>On this page you can edit your personal profile.</p>}
                />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
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
                                    disabled={!isLoaded}
                                    setBase64File={this.setBase64File}
                                    setImage={this.setImage}
                                    userImage={itemPropsToString(userDetails, 'filename')} 
                                    colWidth={6}
                                    clearImage={this.clearImage}
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
                                        <label className="col-form-label col-form-label-sm col-form-label-sm">First Name</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            </div>
                                            <input 
                                                disabled={!isLoaded}
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
                                        <label className="col-form-label col-form-label-sm">Last Name</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-user"></i>
                                                </span>
                                            </div>
                                            <input 
                                                disabled={!isLoaded}
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
                                        <label className="col-form-label col-form-label-sm">Organisation</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-building"></i>
                                                </span>
                                            </div>
                                            <input 
                                                disabled={!isLoaded}
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
                                        <label className="col-form-label col-form-label-sm">Department</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-user-md"></i>
                                                </span>
                                            </div>
                                            <input 
                                                disabled={!isLoaded}
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
                                        <label className="col-form-label col-form-label-sm">Role</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-user-times"></i>
                                                </span>
                                            </div>
                                            <input 
                                                disabled={!isLoaded}
                                                value={itemPropsToString(userDetails, 'role')} 
                                                className="form-control" 
                                                disabled="disabled" 
                                                name='role' />
                                        </div>
                                    </div>
                                </div>
        
                                <div className="col-sm-6 col-xs-12">
                                    <div className={"form-group " + (errors.email && "has-error")}>
                                        <label className="col-form-label col-form-label-sm">Email</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-envelope"></i>
                                                </span>
                                            </div>
                                            <input
                                                disabled={!isLoaded}
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
                                        <label className="col-form-label col-form-label-sm">Phonenumber</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-phone"></i>
                                                </span>
                                            </div>
                                            <input 
                                                disabled={!isLoaded}
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
                                        <label className="col-form-label col-form-label-sm">Email Language</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-globe"></i>
                                                </span>
                                            </div>
                                            <select 
                                                disabled={!isLoaded}
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
                                        <label className="col-form-label col-form-label-sm">Address</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-map-marker"></i>
                                                </span>
                                            </div>
                                            <input 
                                                disabled={!isLoaded}
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
                                        <label className="col-form-label col-form-label-sm">Postal Code</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-address-card"></i>
                                                </span>
                                            </div>
                                            <input 
                                                disabled={!isLoaded}
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
                                        <label className="col-form-label col-form-label-sm">City</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-home"></i>
                                                </span>
                                            </div>
                                            <input 
                                                disabled={!isLoaded}
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
                                        <label className="col-form-label col-form-label-sm">Country</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-flag"></i>
                                                </span>
                                            </div>
                                            <select 
                                                disabled={!isLoaded}
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
                                        <label className="col-form-label col-form-label-sm">Timezone</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-globe"></i>
                                                </span>
                                            </div>
                                            <select 
                                                disabled={!isLoaded}
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
                                        <label className="col-form-label col-form-label-sm">VAT ID</label>
                                        <div className="input-group input-group-sm">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-user"></i>
                                                </span>
                                            </div>
                                            <input 
                                                disabled={!isLoaded}
                                                onChange={value => this.updateAccountData('vatId', value)}
                                                value={itemPropsToString(accountDetails, 'vatId')} 
                                                placeholder="Enter your VAT ID"  
                                                className="form-control" 
                                                name='vat' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <BottomSaveBar
                      disabled={disabledBtn || !isLoaded}
                      loading={isUpdating}
                      onSave={this.saveChanges}
                      onDeleteUser={this.handleDeleteUser} />  

                  </div>
                </div>
              );
            }
          }

export default connect(
    (state) => {
        return {
            userDetails: state.userReducer.userDetails,
            accountDetails: state.userReducer.accountDetails,
            currentUser: state.authReducer.currentUser
        }
    }
)(ProfileOverview);
