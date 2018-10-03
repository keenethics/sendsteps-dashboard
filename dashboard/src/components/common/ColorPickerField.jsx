import React, { Component } from 'react';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

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

        const { labelText, color, infoContent } = this.props;

        return (
            <div>
                <div className="form-group">
                    <label className="control-label">
                        {labelText} {infoContent && <OverlayTrigger 
                            overlay={<Tooltip id={"Colorpicker"}>{infoContent}</Tooltip>}
                            delay={150}
                            placement={"top"}>
                                <i className="fa fa-question-circle"></i>
                        </OverlayTrigger>}
                    </label>
                    <div className="input-group">
                        <OverlayTrigger 
                            overlay={<Tooltip id={"Colorpicker"}>Edit Color</Tooltip>}
                            delay={150}
                            placement={"top"}>
                            <span onClick={this.toggleModal.bind(this)} className="input-group-addon">
                                <i className="fa fa-paint-brush"></i>
                            </span>
                        </OverlayTrigger>
                        
                        <input className="form-control" value={color} placeholder="#000000" />

                        <OverlayTrigger 
                            overlay={<Tooltip id={"Colorpicker"}>{color || "#000000"}</Tooltip>}
                            delay={150}
                            placement={"top"}>
                            <span className="input-group-addon">
                                <i className="fa fa-circle" style={{color: color || "#000000"}}></i>
                            </span>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default ColorPickerField;