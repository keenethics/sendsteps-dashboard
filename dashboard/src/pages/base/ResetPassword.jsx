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

// This is component for test the logic, no pass validation
class ResetPassword extends Component {
  constructor(props) {
      super(props);
      this.state = {
          newPassword: '',
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
        this.setState({ error });
      }
    )
  }

  handleSubmit = () => {
    const { newPassword } = this.state;
    const token = window.location.search.replace('?token=', '');
    postNew(
      `/api/user/resetUserPassword`,
      { newPassword, token },
      result => {
        const { success, error, email } = result;
        this.setState({ error });
        console.log(email, newPassword);
        if (success && email) {
          this.login(email, newPassword);
        }
      },
      error => {
        console.log(error);
        this.setState({ error });
      }
    )
  }

  handleChange = (event) => {
    this.setState({ newPassword: event.target.value });
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
        <label>
          New password:
          <input type="text" onChange={this.handleChange} />
        </label>
        <input type="button" value="Change" onClick={this.handleSubmit}/>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.restoreForm()}
      </div>
    );
  }
}

export default connect() (ResetPassword);
