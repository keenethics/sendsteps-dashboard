import React, { Component } from 'react';
import {ListGroupItem, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MenuItem extends Component {
    render() {
        return (
            <div>
                <OverlayTrigger 
                    overlay={<Tooltip id={this.props.menuText}>{this.props.menuText}</Tooltip>}
                    delay={!this.props.menuOpened ? 150 : 13337}
                    placement="right" 
                >
                    <Link to={this.props.link}>
                        <ListGroupItem>
                            <i className={"fa " + this.props.faIconClass}></i> 
                            <span className="text">
                                {this.props.menuOpened ? this.props.menuText : null}
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
            menuOpened: state.appReducer.menuOpened,
        }
    }
) (MenuItem);
