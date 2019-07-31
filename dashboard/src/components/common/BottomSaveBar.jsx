import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from './../../actions/auth';
import { post } from '../../scripts/api';

class BottomSaveBar extends Component {
  goBack() {
    this.props.history.goBack();
  }

  deleteProfile() {
    post(
      '',
      'deleteUser',
      {},
      result => {
        // Signing user out
        this.props.dispatch(signOut());
      },
      error => console.log(error)
    );
  }

  render() {
    const { onSave, noSave, disabled } = this.props;

    return (
      <div className="card mt-3 mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              {!noSave && (
                <div
                  className="btn btn-success"
                  disabled={disabled}
                  onClick={
                    onSave ||
                    function() {
                      console.log('onSave');
                    }
                  }
                >
                  <i className="fa fa-save" /> Save
                </div>
              )}
              <button
                onClick={() => this.goBack()}
                type="button"
                id="back-btn"
                className="btn btn-outline-secondary float-right ml-3"
              >
                <i className="fa fa-chevron-left" /> Back
              </button>
              <button
                onClick={() => this.deleteProfile()}
                type="button"
                id="delete-btn"
                className="btn btn-danger float-right"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(BottomSaveBar));
