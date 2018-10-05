import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignOutButton from './SignOutButton';

class MenuProfile extends React.Component {
    render() {

        const { menuOpened, currentUser } = this.props;

        return (
            <div>
                {menuOpened ? 
                <div className="menu-profile">
                    <div className="profile-container">
                        <Link to="/user/edit-profile">
                            <div className="profile-image">
                                <i className="fa fa-lg fa-camera"></i>
                            </div>
                        </Link>
                        <div className="profile-details">
                            <p><i>Hi {currentUser && currentUser.userType}!</i></p>
                            <span className="pull-right">
                                <Link to="/user/edit-profile">
                                    <button className="btn btn-xs btn-primary">
                                        <i className="fa fa-user"></i> My Profile
                                    </button>
                                </Link>
                                <SignOutButton />
                            </span>
                        </div>
                    </div>
                </div> 
                : ""}
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            menuOpened: state.appReducer.menuOpened,
            currentUser: state.authReducer.currentUser
        }
    }
)(MenuProfile);