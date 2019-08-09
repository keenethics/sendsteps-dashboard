import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from 'App/actions/auth';
import { Link } from 'react-router-dom';
import RoleBadge from 'App/components/common/labels/RoleBadge';

class UserMenuOptions extends Component {

    addinUrl = 'https://update.sendsteps.com/Sendsteps.setup.exe';


    signOut = () => {
        this.props.dispatch(signOut());
    }

    render() {

        const { currentUser } = this.props;

        return (
            <span>
                <div className="btn-group btn-group-sm mt-3 mb-3 mr-3">
                    <Link to={"/user/edit-profile"} className="pr-2 pl-2 btn btn-sm btn-primary text-light">
                        <i className="fa fa-md fa-user-circle-o mr-1 ml-1"></i> {currentUser.firstName} {currentUser.lastName} <RoleBadge role={currentUser.userType} />
                    </Link>
                    <button type="button" className="btn btn-sm btn-primary" data-toggle="dropdown" >
                        <i className="fa fa-md fa-chevron-down"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right" style={{minWidth: '300px'}} >
                        <Link to={"/user/edit-profile"} className="dropdown-item small">
                            Edit profile <i className="pt-1 pb-1 float-right fa fa-pencil"></i>
                        </Link>
                        <Link to={"/user/edit-profile"} className="dropdown-item small">
                            License & User Info <i className="pt-1 pb-1 float-right fa fa-id-card"></i>
                        </Link>
                        <Link to={"/user/edit-profile"} className="dropdown-item small">
                            Change Password <i className="pt-1 pb-1 float-right fa fa-lock"></i>
                        </Link>
                        <a href={this.addinUrl} target="_blank" className="dropdown-item small">
                            Download Sendsteps <i className="pt-1 pb-1 float-right fa fa-download"></i>
                        </a>
                        <Link to={"/user/edit-profile"} className="dropdown-item small">
                            Help <i className="pt-1 pb-1 float-right fa fa-question-circle"></i>
                        </Link>
                        <div className="dropdown-divider"></div>
                            <div onClick={this.signOut} className="dropdown-item small">
                                Sign Out <i className="pt-1 pb-1 float-right fa fa-sign-out"></i>
                            </div>
                    </div>
                </div>
            </span>
        );
    }
}

export default connect(
    state => {
        return {
            currentUser: state.authReducer.currentUser
        }
    }
)(UserMenuOptions);