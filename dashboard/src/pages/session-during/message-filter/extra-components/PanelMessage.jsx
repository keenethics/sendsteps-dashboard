import React, { Component } from 'react';
import { setStarred } from '../actions';
import { connect } from 'react-redux';

class PanelMessage extends Component {

    onToggleSelect() {
        this.props.onSelect();
    }

    onToggleStar() {
        this.props.dispatch(setStarred(this.props.message.id));
    }

    render() {

        const { message, count, selected } = this.props;
        const isChecked = selected ? true : false;

        // @TODO onHover diff color, onSelect, onStar, onDrag (?)
        return (
            <div className="message">
                <div className="counter">
                    <span>{count}</span>
                </div>
                <div className="starred" onClick={() => this.onToggleStar()}>
                    <span>
                        <i className={message.starred ? "fa fa-star" : "far fa-star" }></i>
                    </span>
                </div>
                <div className="select" onClick={() => this.onToggleSelect()}>
                    <span>
                        <input 
                            onChange={() => this.onToggleSelect()} 
                            onClick={() => this.onToggleSelect()} 
                            checked={isChecked} 
                            type="checkbox" 
                        />
                    </span>
                </div>
                <div className="upvotes">
                    <span>
                        <i className="fa fa-heart"></i> {message.upvoteCount}
                    </span>
                </div>
                <div className="msg-text">
                    {message.groupId && <span className="grouped-msg"></span>}
                    <span>
                        {message.text}
                    </span>
                   
                </div>
            </div>
        );
    }
}

export default connect() (PanelMessage);