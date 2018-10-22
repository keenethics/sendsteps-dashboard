import React, { Component } from 'react';
import { setStarred } from '../actions';
import './PanelMessage.scss';
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
                <div className="starred">
                    <span><i className={message.starred ? "fa fa-star" : "far fa-star" }></i></span>
                </div>
                <div className="select">
                    <span>
                        <input type="checkbox" />
                    </span>
                </div>
                <div className="upvotes">
                    <span>
                        <i className="fa fa-heart"></i> x {message.upvoteCount}
                    </span>
                </div>
                <div className="msg-text">
                    <span>
                        {message.text}
                    </span>
                </div>
            
            </div>
            // <li className="list-group-item message">
            //     <div className="counter">{count}</div>
            //     <div className="starred" onClick={() => this.onToggleStar()}>
            //         <i className={message.starred ? "fa fa-star" : "far fa-star" }></i>
            //     </div>
            //     <div onClick={() => this.onToggleSelect()} className="select">
            //         <input 
            //             onChange={() => this.onToggleSelect()} 
            //             onClick={() => this.onToggleSelect()} 
            //             checked={isChecked} 
            //             type="checkbox" /></div>
            //     <div className="upvotes"><i className="fa fa-heart"></i> x {message.upvoteCount}</div>
            //     <div>
            //         <span>{message.text}</span>
            //     </div>
            // </li>
        );
    }
}

export default connect() (PanelMessage);