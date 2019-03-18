import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignOutButton from './SignOutButton';
import './MenuProfile.scss';
import { urlIsImage } from '../../scripts/validationChecker';

class MenuProfile extends React.Component {
    render() {

        const { menuOpened, currentUser } = this.props;

        return (
            <div>
                {menuOpened ? 
                <div className="menu-profile">
                    <div className="profile-container">
                        <Link to="/user/edit-profile">
                            {currentUser && urlIsImage(currentUser.profilePic) && 
                            <div 
                                className="profile-image"
                                style={{
                                    background: `url(${currentUser.profilePic}) center center`,
                                    backgroundSize: '90%',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor: '#ffffff'
                                }}>
                            </div>}
                            {currentUser && !urlIsImage(currentUser.profilePic) && 
                            <div className="profile-image">
                                <i className="fa fa-lg fa-camera"></i>
                            </div>}
                        </Link>
                        <div className="profile-details">
                            <p><i>Hi {currentUser && currentUser.firstName}!</i></p>
                            <span className="pull-right">
                                <Link to="/user/edit-profile">
                                    <button className="btn btn-primary">
                                        <i className="fa fa-user"></i> Profile
                                    </button>
                                </Link>
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