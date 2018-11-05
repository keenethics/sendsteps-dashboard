import React, { Component } from 'react';
import TooltipNotification from './TooltipNotification';
import ColorPickerModal from './ColorPickerModal';
import './ColorPickerField.scss';

class ColorPickerField extends Component {

    state = {
        modalOpen: false,
        color: this.props.color
    }

    toggleColorPicker = () => {
        // @TODO Dispatch this
        this.setState({modalOpen: !this.state.modalOpen});
    }

    onChange = color => {
        console.log(color)
        this.setState({color: color.hex});
    }

    changeDirect = color => {
        this.setState({color})
    }

    render() {

        const { labelText, infoContent } = this.props;
        const { modalOpen, color } = this.state;

        return (
            <div>
                <div className="form-group">
                    <label className="control-label">
                        {labelText} 
                        {infoContent && 
                        <TooltipNotification title="Colorpicker" placement={"top"} tooltip={infoContent}>
                            <i className="fa fa-question-circle"></i>
                        </TooltipNotification>}
                    </label>
                    <div className="input-group">
                    <TooltipNotification title="Colorpicker" placement={"top"} tooltip={"Edit Color"}>
                        <span onClick={this.toggleColorPicker} className="input-group-addon">
                            <i className="fa fa-paint-brush"></i>
                        </span>
                    </TooltipNotification>
                        <input className="form-control" value={color} onChange={this.changeDirect} placeholder="#000000" />

                    <TooltipNotification title="Colorpicker" placement={"top"} tooltip={color || "#000000"}>
                        <span onClick={this.toggleColorPicker} className="input-group-addon">
                            <i className="fa fa-square" style={{color: color || "#000000"}}></i>
                        </span>
                    </TooltipNotification>
                    </div>
                </div>
                <ColorPickerModal toggle={this.toggleColorPicker} onChange={this.onChange} modalOpen={modalOpen} color={color || "#000000"} />
            </div>
        )
    }
}

export default ColorPickerField;