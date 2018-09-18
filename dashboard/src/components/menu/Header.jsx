import React from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../../actions/app';
import SignOutButton from './SignOutButton';

class Header extends React.Component {

    toggleSideBar() {
        this.props.dispatch(toggleMenu(!this.props.menuOpened));
    }

    render() {

        return (
            <header>
                <div className="header-content">
                    <i onClick={this.toggleSideBar.bind(this)} className="fa fa-bars menu-button"></i>
                    <span className="pull-right" >
                        {/* <p >({currentUser.userType})</p> */}
                        <SignOutButton />
                    </span>
                    
                </div>
            </header>
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
)(Header);