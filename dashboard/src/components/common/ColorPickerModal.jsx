import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { HuePicker, TwitterPicker } from 'react-color';
import { generateColorList, isValidHexColor } from '../../scripts/colorHelper';

class ColorPickerModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            advancedSettings: false,
            modalOpen: false,
            color: this.props.color
        }
    }

    changeColor = color => {
        this.setState({color: color.hex})
    }


    toggleAdvanced = () => {
        this.setState({
            advancedSettings: !this.state.advancedSettings
        });
    }

    saveColor = () => {
        this.props.onChange(this.state.color);
        this.props.toggle();
    }

    render() {

        const { modalOpen, toggle } = this.props;
        const { advancedSettings, color } = this.state;
        const validColor = isValidHexColor(color) ? color : "#000000";

        return (
            <Modal show={modalOpen} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a color</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <span className="hue-pick-container">
                                <HuePicker width={"100%"} color={color} onChange={this.changeColor} />
                            </span>
                            <TwitterPicker width={"100%"} colors={generateColorList(validColor)} color={validColor} onChange={this.changeColor} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success float-left" onClick={this.saveColor}><i className="fa fa-save"></i> Save</button>
                    {/* <button className="btn btn-primary" active={advancedSettings} onClick={this.toggleAdvanced}><i className="fa fa-cog"></i> Advanced Colors</button> */}
                    <button className="btn btn-primary" onClick={toggle}><i className="fa fa-times"></i> Close</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ColorPickerModal;