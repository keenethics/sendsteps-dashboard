import React, { Component } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import './ToggleButton.scss';

class ToggleButton extends Component {
    
    render() {

        const { active, off, on, onClick, onStyle, offStyle } = this.props

        return (
            <BootstrapSwitchButton
                checked={!!active}
                onlabel={on}
                offlabel={off}
                onstyle={onStyle ? onStyle : 'success'}
                offStyle={offStyle ? offStyle : 'secondary'}
                style='w-100'
                onChange={onClick}
            />);


        // return (
        // <Toggle
        //     size={'sm'}
        //     offstyle="secondary"
        //     onClick={onClick}
        //     on={<span>{on}</span>}
        //     off={<span>{off}</span>}
        //     onClassName={'padd-center-small'}
        //     offClassName={'padd-center-small'}
        //     active={active}
        // />);
    }
}

export default ToggleButton;