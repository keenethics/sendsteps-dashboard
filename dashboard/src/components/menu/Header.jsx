import React from 'react';
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';

class Header extends React.Component {

    toggleSideBar() {
        this.props.dispatch(appActions.toggleMenu(!this.props.menuOpened));
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

const mapStateToProps = (state) => {
    return {
        menuOpened: state.appReducer.menuOpened
    }
}
export default connect(mapStateToProps)(Header);