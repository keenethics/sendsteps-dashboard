import React, { Component } from 'react';
import { connect } from 'react-redux'
import { get } from '../../../../scripts/api';
import { setDeleteSurveyId } from '../actions'
import { Modal, Button } from 'react-bootstrap'
import { setSurveyData } from '../../../session-results/surveys/actions';
import { toast } from 'react-toastify';

class DeleteSurveyModal extends Component {

    deleteSurvey = () => {

        const { deleteSurveyId } = this.props;

        get(
            'surveys',
            'deleteSurvey',
            { id: deleteSurveyId },
            result => {
                console.log(result)
                this.props.dispatch(setSurveyData(result))
                this.props.dispatch(setDeleteSurveyId(null))
                toast("Survey deleted!")
            },
            err => console.error(err)
        )
    }

    hideModal = () => {
        this.props.dispatch(setDeleteSurveyId(null))
    }

    render() {

        const { deleteSurveyId } = this.props;

        return (
            <Modal
                onHide={this.hideModal}
                show={!!deleteSurveyId}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Survey?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this survey?
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn btn-danger" onClick={this.deleteSurvey}>
                        <i className="fa fa-trash"></i> Delete
                    </div>
                    <div className="btn btn-primary" onClick={this.hideModal}>
                        <i className="fa fa-times"></i> Cancel
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    state => {
        return {
            deleteSurveyId: state.surveyReducer.deleteSurveyId
        }
    }
)(DeleteSurveyModal);