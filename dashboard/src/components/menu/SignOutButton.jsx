import React from 'react';
import { signOut } from '../../actions/auth';
import { connect } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class SignOutButton extends React.Component {

    signOut() {
        this.props.dispatch(signOut());
    }

    render() {
        return (
            <OverlayTrigger 
                overlay={<Tooltip id={1}>{"Sign out"}</Tooltip>}
                delay={150}
                placement="left">
                <button 
                    onClick={this.signOut.bind(this)} 
                    className="btn btn-xs btn-primary pull-right logout">
                    <i className="fa fa-sign-out-alt"></i>
                </button>
            </OverlayTrigger>
        )
    }
}

export default connect()(SignOutButton);