import React from 'react';
import { connect } from 'react-redux';
import { get, post } from '../../scripts/api';
import { setUserProfileData, setAccountProfileData } from './actions';
import { signOut } from '../../actions/auth';
import ImageUploadField from '../../components/common/ImageUploadField';
import BottomSaveBar from '../../components/common/BottomSaveBar';
import HeaderPanel from '../../components/common/HeaderPanel';
import { itemPropsToString } from '../../scripts/arrayHelper';
import { isValidEmail, isValidName } from '../../scripts/validationChecker';
import { toast } from 'react-toastify';
import { addToLocalStorage } from '../../scripts/localStorage';
import { addCookieValues } from '../../scripts/cookieStorage';

class ProfileOverview extends React.Component {
  state = {
    timezones: null,
    countries: null,
    errors: {
      firstName: null,
      lastName: null,
      email: null
    },
    disabledBtn: false,
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

    if(!hasErrors) {
        this.setState({ disabledBtn: true })
        this.updateUserInfo()
    } else {
        toast('Unable to update profile. There are still some invalid fields.')
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
          formData.append(key, properties[key]);
      }
      return formData;
    }

    updateUserInfo = () => {
        const { userDetails, accountDetails } = this.props;
        const { id, departmentName, email, firstName, lastName, language, phonenumber, filename } = userDetails
        const { country, postalCode, city, address, university, vatId, timezone } = accountDetails

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

        post('users', 'updateUserProfile', paramsData,
            result => {
              this.setState({ disabledBtn: false });
              if (result.fileUrl) this.setImage(result.fileUrl);
              if (result.token) {
                console.log('SAVING TOKEN....');
                if (!addToLocalStorage('token', result.token)) {
                  if (!addCookieValues('SSTToken', result.token, 48)) {
                    toast(
                      'Unable to save user key to LocalStorage/Cookies, please enable these settings in your browser before logging in.'
                    );
                  }
                }
              }
              return toast('Profile details updated!');
            },
            ({ error }) => {
              this.setState({ disabledBtn: false });
              toast(`Unable to update profile details... ${error}`);
            }
        )
    }
    
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // Use 'react-image-crop' for Images
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    render() {

        const { userDetails, accountDetails } = this.props;
        const { timezones, countries, errors, disabledBtn } = this.state;

    return (
      <div>
        <HeaderPanel
          title={'Your Profile'}
          content={<p>On this page you can edit your personal profile.</p>}
        />
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h2>Edit your user details</h2>
                  <p>
                    Welcome to your personal dashboard! Please keep your profile information
                    up-to-date. This way you are ensured of receiving system notifications and the
                    delivery of your session results at all times.
                  </p>
                </div>
                <ImageUploadField
                  setImage={this.setImage}
                  userImage={itemPropsToString(userDetails, 'filename')}
                  colWidth={6}
                  labelText={'Profile Picture'}
                />
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-12">
                  <h3>Contact Information</h3>
                </div>
                <div className="col-sm-6 col-xs-12">
                  <div className={'form-group ' + (errors.firstName && 'has-error')}>
                    <label className="col-form-label">First Name</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user" />
                        </span>
                      </div>
                      <input
                        onBlur={this.validateFirstName}
                        onChange={value => this.updateUserData('firstName', value)}
                        value={itemPropsToString(userDetails, 'firstName')}
                        placeholder="Enter your first name"
                        className="form-control"
                        name="firstName"
                      />
                    </div>
                    {errors.firstName && <span className="help-block">{errors.firstName}</span>}
                  </div>
                </div>

                <div className="col-sm-6 col-xs-12">
                  <div className={'form-group ' + (errors.lastName && 'has-error')}>
                    <label className="col-form-label">Last Name</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user" />
                        </span>
                      </div>
                      <input
                        onBlur={this.validateLastName}
                        onChange={value => this.updateUserData('lastName', value)}
                        value={itemPropsToString(userDetails, 'lastName')}
                        placeholder="Enter your last name"
                        className="form-control"
                        name="lastName"
                      />
                    </div>
                    {errors.lastName && <span className="help-block">{errors.lastName}</span>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="col-form-label">Organisation</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-building" />
                        </span>
                      </div>
                      <input
                        onChange={value => this.updateAccountData('university', value)}
                        value={itemPropsToString(accountDetails, 'university')}
                        placeholder="Enter your Organisation"
                        className="form-control"
                        name="organisation"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="col-form-label">Department</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user-md" />
                        </span>
                      </div>
                      <input
                        onChange={value => this.updateUserData('departmentName', value)}
                        value={itemPropsToString(userDetails, 'departmentName')}
                        placeholder="Enter your Department"
                        className="form-control"
                        name="department"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="col-form-label">Role</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user-times" />
                        </span>
                      </div>
                      <input
                        value={itemPropsToString(userDetails, 'role')}
                        className="form-control"
                        disabled="disabled"
                        name="role"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xs-12">
                  <div className={'form-group ' + (errors.email && 'has-error')}>
                    <label className="col-form-label">Email</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-envelope" />
                        </span>
                      </div>
                      <input
                        onBlur={this.validateEmail}
                        onChange={value => this.updateUserData('email', value)}
                        value={itemPropsToString(userDetails, 'email')}
                        placeholder="Enter your E-mail"
                        className="form-control"
                        name="email"
                      />
                    </div>
                    {errors.email && <span className="help-block">{errors.email}</span>}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="col-form-label">Phonenumber</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-phone" />
                        </span>
                      </div>
                      <input
                        onChange={value => this.updateUserData('phonenumber', value)}
                        value={itemPropsToString(userDetails, 'phonenumber')}
                        placeholder="Enter your phonenumber"
                        className="form-control"
                        name="phonenumber"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="col-form-label">Email Language</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-globe" />
                        </span>
                      </div>
                      <select
                        onChange={value => this.updateUserData('language', value)}
                        value={itemPropsToString(userDetails, 'language')}
                        className="form-control"
                        id="language"
                      >
                        <option value="nl">Netherlands (Dutch)</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-12">
                  <h3>Invoice Settings</h3>
                </div>
                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="col-form-label">Address</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-map-marker" />
                        </span>
                      </div>
                      <input
                        onChange={value => this.updateAccountData('address', value)}
                        value={itemPropsToString(accountDetails, 'address')}
                        placeholder="Enter your Address"
                        className="form-control"
                        name="address"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="col-form-label">Postal Code</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-address-card" />
                        </span>
                      </div>
                      <input
                        onChange={value => this.updateAccountData('postalCode', value)}
                        value={itemPropsToString(accountDetails, 'postalCode')}
                        placeholder="Enter your Postal Code"
                        className="form-control"
                        name="postalcode"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="col-form-label">City</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-home" />
                        </span>
                      </div>
                      <input
                        onChange={value => this.updateAccountData('city', value)}
                        value={itemPropsToString(accountDetails, 'city')}
                        placeholder="Enter your City"
                        className="form-control"
                        name="city"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="col-form-label">Country</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-flag" />
                        </span>
                      </div>
                      <select
                        onChange={value => this.updateAccountData('country', value)}
                        value={itemPropsToString(accountDetails, 'country')}
                        className="form-control"
                        id="country"
                      >
                        {countries &&
                          countries.map(country => {
                            return (
                              <option key={country.isoCode} value={country.isoCode}>
                                {country.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="col-form-label">Timezone</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-globe" />
                        </span>
                      </div>
                      <select
                        onChange={value => this.updateAccountData('timezone', value)}
                        value={itemPropsToString(accountDetails, 'timezone')}
                        className="form-control"
                        id="timezone"
                      >
                        {timezones &&
                          timezones.map(timezone => {
                            return (
                              <option key={timezone.id} value={timezone.identifier}>
                                {timezone.identifier}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="col-form-label">VAT ID</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user" />
                        </span>
                      </div>
                      <input
                        onChange={value => this.updateAccountData('vatId', value)}
                        value={itemPropsToString(accountDetails, 'vatId')}
                        placeholder="Enter your VAT ID"
                        className="form-control"
                        name="vat"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BottomSaveBar disabled={disabledBtn} onSave={this.saveChanges} onDeleteUser={this.handleDeleteUser} />
        </div>
      </div>
    );
  }
}
export default connect(state => {
  return {
    userDetails: state.userReducer.userDetails,
    accountDetails: state.userReducer.accountDetails
  };
})(ProfileOverview);
