import React, { Component } from 'react';
import { connect } from "react-redux";
import { postNew } from '../../scripts/api';
import {
  authLoading,
  authenticate,
  setAuthorized,
  authRequired,
} from "../../actions/auth";
import { toast } from "react-toastify";
import ToastComponent from '../../components/common/ToastComponent'

// This is component for test the logic, no pass validation
class ResetPassword extends Component {
  constructor(props) {
      super(props);
      this.state = {
          newPassword: '',
          repeatPassword: '',
          error: null,
          success: null,
      }
  }

  componentDidMount() {
    const { search } = window.location;
    
    postNew(
      `/api/user/resetPassword${search}`,
      {},
      result => {
        const { success, error } = result;
        this.setState({ success, error });

      },
      error => {
        console.log(error);
        this.setState({ ...error });
      }
    )
  }

  handleSubmit = () => {
    const { newPassword, repeatPassword } = this.state;
    if (newPassword !== repeatPassword) {
      return toast('Passwords mismatch!');
    }
    const token = window.location.search.replace('?token=', '');
    postNew(
      `/api/user/resetUserPassword`,
      { newPassword, token },
      result => {
        const { success, error, email } = result;
        if (error) {
          return toast(error);
        }
        // this.setState({ error });
        console.log(email, newPassword);
        if (success && email) {
          this.login(email, newPassword);
        }
      },
      ({error}) => {
        // this.setState({ error });
        toast(error);
      }
    )
  }

  handleChange = (event) => {
    this.setState({ newPassword: event.target.value });
  }

  handleRepeatChange = (event) => {
    this.setState({ repeatPassword: event.target.value });
  }

  login = (email, password) => {
    this.props.dispatch(authLoading(true));
    authenticate(
      email,
      password,
      // Hmm, only returning the token, why not an user also? We can use this token anyways
      // To request user data.
      userData => {
        this.props.dispatch(authRequired(true));
        this.props.dispatch(setAuthorized(true));
        history.pushState(null, null, '/');
        window.location.href = '/';
      },
      error => console.log(error)
    );
  };

  restoreForm = () => {
    const { error, success } = this.state;
    if (!error && !success) {
      return "Loading...";
    } else if (error) {
      return error;
    }
    return (
      <div>
        <label style={{display: 'flex', flexDirection: 'column', width: '250px'}}>
          New password:
          <input type="password" onChange={this.handleChange} />
          Repeat password:
          <input type="password" onChange={this.handleRepeatChange} />
        </label>
        <input type="button" value="Change" onClick={this.handleSubmit}/>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.restoreForm()}
        <ToastComponent />
      </div>
    );
  }
}

export default connect() (ResetPassword);
