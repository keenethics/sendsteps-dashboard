import * as React from 'react';  

class RoleBadge extends React.Component {

    roleIcons = {
        admin: <span className="badge badge-light ml-2 px-2 font-weight-normal">Administrator</span>,
        user: <span className="badge badge-light ml-2 px-2 font-weight-normal"> User</span>
    }
    
    render() {

        const { role } = this.props

        return (
            <>
                {role && this.roleIcons[role]}
            </>
        )
    }
}

export default RoleBadge;