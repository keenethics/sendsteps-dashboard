import * as React from 'react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './MenuProfile.scss';
import { urlIsImage } from 'App/scripts/validationChecker';

class MenuProfile extends React.Component {
    render() {
        const { menuOpened, currentUser } = this.props;

        return (
            <div>
                {menuOpened &&
                <div className="menu-profile">
                    <div className="profile-container">
                        <Link to="/user/edit-profile">
                            {currentUser && urlIsImage(currentUser.profilePic) && 
                            <div 
                                className="profile-image"
                                style={{
                                    background: `url(${currentUser.profilePic}) center center`,
                                    backgroundSize: '100%',
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
                            <p>Hi <strong>{currentUser && currentUser.firstName}</strong>!</p> 
                        </div>
                    </div>
                </div> }
                {!menuOpened && <>
                <Link to="/user/edit-profile">
                    {currentUser && urlIsImage(currentUser.profilePic) && 
                    <div 
                        className="profile-image-small"
                        style={{
                            background: `url(${currentUser.profilePic}) center center`,
                            backgroundSize: '100%',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: '#ffffff'
                        }}>
                    </div>}
                    {currentUser && !urlIsImage(currentUser.profilePic) && 
                    <div className="profile-image">
                        <i className="fa fa-lg fa-camera"></i>
                    </div>}
                </Link>
                <hr/>
                </>}

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