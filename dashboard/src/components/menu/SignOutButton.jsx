import React from 'react';
import { signOut } from '../../actions/auth';
import { connect } from 'react-redux';
import TooltipNotification from '../common/TooltipNotification';

class SignOutButton extends React.Component {

    signOut() {
        this.props.dispatch(signOut());
    }

    render() {
        return (
            <TooltipNotification placement="left" tooltip="Sign out" title={1} >
                <button 
                    onClick={this.signOut.bind(this)} 
                    className="btn btn-xs btn-primary pull-right logout">
                    <i className="fa fa-sign-out"></i>
                </button>
            </TooltipNotification>
        )
    }
}

export default connect()(SignOutButton);