import React, { Component } from 'react';
import {ListGroupItem, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MenuItem extends Component {
    render() {

        const { menuOpened, menuText, faIconClass } = this.props;

        return (
            <div>
                <OverlayTrigger 
                    overlay={<Tooltip id={menuText}>{menuText}</Tooltip>}
                    delay={!menuOpened ? 150 : 13337}
                    placement="right" 
                >
                    <Link to={this.props.link}>
                        <ListGroupItem>
                            <i className={"fa " + faIconClass}></i> 
                            <span className="text">
                                {menuText}
                            </span>
                        </ListGroupItem>
                    </Link>
                </OverlayTrigger>
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            menuOpened: state.appReducer.menuOpened
        }
    }
) (MenuItem);
