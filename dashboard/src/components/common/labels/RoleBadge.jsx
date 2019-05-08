import React, { Component } from 'react';

class RoleBadge extends Component {


    roleIcons = {
        admin: <span className="badge badge-pill badge-danger small ml-2"> Administrator</span>,
        user: <span className="badge badge-pill badge-success small ml-2"> User</span>,
    }
    
    render() {

        const { role } = this.props

        return role ? this.roleIcons[role] : '';
    }
}

export default RoleBadge;