import React from 'react';
import './FullScreenButton.scss';

const FullScreenButton = props => {
    return (
        <i onClick={props.onClick || function() { console.log('Fullscreen clicked') } } className="full-screen fa-xs fa fa-arrows-alt"></i>
    )
}

export default FullScreenButton;