import React from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../../actions/app';
import SignOutButton from './SignOutButton';
import './Header.scss'
import Logo from '../../assets/images/logo.png';

class Header extends React.Component {
    render() {
        
        const sstLogo = new Image();
        sstLogo.src = Logo;

        return (
            <header>
                <div className="header-content">
                    <i onClick={() => this.props.dispatch(toggleMenu(!this.props.menuOpened))} className="fa fa-align-left menu-button"></i>
                    <a href="/">
                        <span className="sst-logo-header">
                            <img alt="Sendsteps" src={Logo} />
                        </span>
                    </a>
                    <span className="pull-right" >
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