import React, { Component } from 'react';
import TooltipNotification from '../common/TooltipNotification';
import { ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class MenuItem extends Component {
    render() {

        const { menuOpened, menuText, faIconClass } = this.props;

        return (
            <div className="menu-item">
                <TooltipNotification placement="right" tooltip={menuText} title={menuText} delay={menuOpened ? 133337 : 150}>
                    <Link to={this.props.link}>
                        <ListGroupItem>
                            <i className={"fa " + faIconClass}></i> 
                            <span className="text">
                                {menuText}
                            </span>
                        </ListGroupItem>
                    </Link>
                </TooltipNotification>
            </div>
        )
    }
}
export default MenuItem;
