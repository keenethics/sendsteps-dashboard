import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { HuePicker, TwitterPicker } from 'react-color';
import { generateColorList } from '../../scripts/colorHelper';

class ColorPickerModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            advancedSettings: false,
            modalOpen: false,
        }
    }

    changeColor = color => {
        this.props.onChange(color);
    }

    toggleAdvanced = () => {
        this.setState({
            advancedSettings: !this.state.advancedSettings
        });
    }

    render() {

        const { modalOpen, color, toggle } = this.props;
        const { advancedSettings } = this.state;

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
                            <TwitterPicker width={"100%"} colors={generateColorList(color)} color={color} onChange={this.changeColor} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle={"success"} className="pull-left" onClick={this.toggle}><i className="fa fa-save"></i> Save</Button>
                    <Button bsStyle={"primary"} active={advancedSettings} onClick={this.toggleAdvanced}><i className="fa fa-cog"></i> Advanced Colors</Button>
                    <Button onClick={this.toggle}><i className="fa fa-times"></i> Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ColorPickerModal;