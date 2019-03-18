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
                    <button className="btn btn-outline-primary" onClick={this.toggleSurvey}><i className="fa fa-check"></i> Got it!</button>
                    <button className="btn btn-outline-secondary" onClick={this.props.closeModal}><i className="fa fa-times"></i> Cancel</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ToggleSurveyModel;