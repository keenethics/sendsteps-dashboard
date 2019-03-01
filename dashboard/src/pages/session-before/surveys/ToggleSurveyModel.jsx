import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ToggleSurveyModel extends Component {

    toggleSurvey = () => {
        this.props.toggleSurvey()
        this.props.closeModal()
    }

    render() {

        const { modalOpen } = this.props;

        return (
            <Modal show={!!modalOpen} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enable Survey Tab?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The survey tab will be visible on the response website.
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" onClick={this.toggleSurvey}><i className="fa fa-check"></i> Got it!</Button>
                    <Button onClick={this.props.closeModal}><i className="fa fa-times"></i> Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ToggleSurveyModel;