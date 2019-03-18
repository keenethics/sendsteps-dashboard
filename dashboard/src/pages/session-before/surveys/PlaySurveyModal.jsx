import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setCurrentSurveyToPlay } from './actions';

class PlaySurveyModal extends Component {

    handleClose = () => {
        this.props.dispatch(setCurrentSurveyToPlay(null));
    }

    startSurvey = () => {
        const { currentSurveyToPlay } = this.props;
        this.props.updateSurveyStatus(1, currentSurveyToPlay);
        this.handleClose();
    }

    render() {

        const { currentSurveyToPlay } = this.props;

        return (
            <Modal show={!!currentSurveyToPlay} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Start Survey</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to start this survey? This will stop any other ongoing survey.
                    <br/>
                    <br/>
                    Starting this survey will also automatically enable the 'show survey' button and will enable survey questions for your audience.
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn btn-success" onClick={this.startSurvey}><i className="fa fa-play"></i> Start</div>
                    <div className="btn btn-primary" onClick={this.handleClose.bind(this)}><i className="fa fa-times"></i> Cancel</div>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    state => {
        return {
            currentSurveyToPlay: state.surveyReducer.currentSurveyToPlay
        }
    }
)(PlaySurveyModal);