import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

class BottomSaveBar extends Component {
  goBack() {
    this.props.history.goBack();
  }

  render() {
    const { onSave, noSave, disabled, onDeleteUser } = this.props;

    return (
      <div className="card mt-3 mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              {!noSave &&
                <div
                  className={classNames('btn btn-success', { disabled })}
                  disabled={disabled}
                  onClick={!disabled && (onSave || function(){ console.log("onSave")})}
                >
                  <i className="fa fa-save"></i> Save
                </div>
              }
              <button 
                onClick={() => this.goBack()}
                type='button' 
                id='back-btn' 
                className='btn btn-outline-secondary float-right'
              >
                <i className="fa fa-chevron-left"></i> Back
              </button>
              { onDeleteUser &&
                <button
                  onClick={onDeleteUser}
                  type="button"
                  id="delete-btn"
                  className="btn btn-danger float-right mr-2"
                >
                  Delete account
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(BottomSaveBar));
