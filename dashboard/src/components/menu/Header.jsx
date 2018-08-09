import React from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../../actions/appActions';

class Header extends React.Component {

    toggleSideBar() {
        this.props.dispatch(toggleMenu(!this.props.menuOpened));
    }

    render() {
        return (
            <header>
                <div className="header-content">
                    <i onClick={this.toggleSideBar.bind(this)} className="fa fa-bars menu-button"></i>
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