import React from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../../actions/app';
import { signOut } from '../../actions/auth';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class Header extends React.Component {

    toggleSideBar() {
        this.props.dispatch(toggleMenu(!this.props.menuOpened));
    }

    signOut() {
        this.props.dispatch(signOut());
    }

    render() {
        return (
            <header>
                <div className="header-content">
                    <i onClick={this.toggleSideBar.bind(this)} className="fa fa-bars menu-button"></i>

                    <OverlayTrigger 
                        overlay={<Tooltip id={1}>{"Sign out"}</Tooltip>}
                        delay={150}
                        placement="left" 
                    >
                        <button onClick={this.signOut.bind(this)} className="btn btn-xs btn-primary pull-right logout"><i className="fa fa-sign-out-alt"></i></button>
                    </OverlayTrigger>
                </div>
            </header>
        )
    }
}

export default connect(
    (state) => {
        return {
            menuOpened: state.appReducer.menuOpened
        }
    }
)(Header);