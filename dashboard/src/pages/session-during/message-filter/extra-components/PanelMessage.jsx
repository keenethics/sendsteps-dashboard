import React, { Component } from 'react';
import { setStarred } from '../actions';
import { connect } from 'react-redux';
import { callAPI } from '../../../../actions/api';
import { isValueInArray } from '../../../../scripts/arrayHelper';

class PanelMessage extends Component {

    onToggleSelect() {
        this.props.onSelect();
    }

    onToggleStar() {
        const messageId = this.props.message.id;
        this.props.dispatch(setStarred(this.props.message.id));
        this.props.dispatch(
            callAPI(
                'messagefilter',
                'starMessage',
                JSON.stringify({
                    id: messageId
                }),
                setStarred(this.props.message.id)
            )
        );
    }

    getGroupStyle() {
        const { message, messageGroups } = this.props;
        if(messageGroups && message.groupId && isValueInArray(message.groupId.toString(), Object.keys(messageGroups))) {
            return {borderTop: "14px solid " + messageGroups[message.groupId].color};
        }
        return null;
    }

    render() {

        const { message, count, selected } = this.props;
        const isChecked = selected ? true : false;
        const isStarred = parseInt(message.starred, 2) === 1;

        // @TODO onHover diff color, onSelect, onStar, onDrag (?)
        return (
            <div className="message">
                <div className="counter" onClick={() => this.onToggleSelect()}>
                    <span>{count}</span>
                </div>
                <div className="starred" onClick={() => this.onToggleStar()}>
                    <span>
                        <i className={isStarred ? "fa fa-star" : "far fa-star" }></i>
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
                {message.upvoteCount && <div className="upvotes">
                    <span>
                        <i className="fa fa-heart"></i> {message.upvoteCount}
                    </span>
                </div>}
                <div className="msg-text" onClick={() => this.onToggleSelect()}>
                    
                    <span>
                        {message.text}
                    </span>
                   
                </div>
                {message.groupId !== null && <span style={this.getGroupStyle()} className="grouped-msg"></span>}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            messageGroups: state.messageFilterReducer.messageGroups
        }
    }
) (PanelMessage);