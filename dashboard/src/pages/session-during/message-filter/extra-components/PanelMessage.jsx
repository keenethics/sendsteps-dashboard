import React, { Component } from 'react';
import './PanelMessage.scss';

class PanelMessage extends Component {
    render() {

        const { message, count, onSelect, selected } = this.props;

        // @TODO onHover diff color, onSelect, onStar, onDrag (?)
        return (
            <li className="list-group-item message">
                <div className="counter">{count}</div>
                <div className="starred"><i className="fa fa-star"></i></div>
                <div onClick={onSelect || function(){ console.log('onSelect') }} className="select"><input onChange={onSelect} checked={selected} type="checkbox" /></div>
                <div className="upvotes"><i className="fa fa-heart"></i> x {Math.floor(Math.random() * 100)}</div>
                <div>{message.text}</div>
            </li>
        );
    }
}

export default PanelMessage;