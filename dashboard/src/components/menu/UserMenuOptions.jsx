import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';

class UserMenuOptions extends Component {

    state = {
        menuOpen: false
    }

    toggleMenu = () => this.setState({menuOpen: !this.state.menuOpen})

    render() {

        const { menuOpen } = this.state
        const { currentUser } = this.props;

        console.log(currentUser)
        console.log(menuOpen)


        return (
            <Dropdown onToggle={this.toggleMenu}>
                <button onClick={this.toggleMenu} className="btn btn-sm btn-success">
                    {currentUser.firstName} {currentUser.lastName} {currentUser.userType}
                </button>

                <Dropdown.Menu show={menuOpen} alignRight={true}>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
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