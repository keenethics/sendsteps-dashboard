import React, { Component } from 'react';
import TooltipNotification from './TooltipNotification';

class ColorPickerField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        }
    }

    toggleModal() {
        // @TODO Dispatch this
        this.setState({modalOpen: !this.state.modalOpen})
    }

    render() {

        const { labelText, color, infoContent, onChange } = this.props;

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
                        <span onClick={this.toggleModal.bind(this)} className="input-group-addon">
                            <i className="fa fa-paint-brush"></i>
                        </span>
                    </TooltipNotification>
                        <input className="form-control" value={color} onChange={onChange} placeholder="#000000" />

                    <TooltipNotification title="Colorpicker" placement={"top"} tooltip={color || "#000000"}>
                        <span className="input-group-addon">
                            <i className="fa fa-circle" style={{color: color || "#000000"}}></i>
                        </span>
                    </TooltipNotification>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default ColorPickerField;