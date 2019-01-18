import React, { Component } from 'react';
import { setDeletingSurveyQuestionId } from '../actions'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { post } from '../../../../scripts/api';
import { toast } from 'react-toastify';


class DeleteSurveyQuestionModal extends Component {

    toggleClose = () => {
        this.props.dispatch(setDeletingSurveyQuestionId(null))
    }

    deleteSurveyQuestion = () => {
        const { deleteSurveyQuestionId } = this.props

        post(
            'surveys',
            'deleteSurveyQuestion',
            JSON.stringify({
                id: deleteSurveyQuestionId
            }),
            () => {
                this.props.getSurveyQuestions()
                this.props.dispatch(setDeletingSurveyQuestionId(null))
                toast("Survey question removed!")
            },
            err => {
                console.log(err)
                this.props.dispatch(setDeletingSurveyQuestionId(null))
                toast("Unable to remove survey question." + JSON.stringify({err}))
            }
        )
    }

    render() {

        const { deleteSurveyQuestionId } = this.props

        console.lo

        return (
            <Modal show={!!deleteSurveyQuestionId} onHide={this.toggleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete survey question?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            Are you sure you want to delete this survey question?
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle={"danger"} className="pull-left" onClick={this.deleteSurveyQuestion}><i className="fa fa-trash"></i> Delete</Button>
                    <Button onClick={this.toggleClose}><i className="fa fa-times"></i> Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    state => {
        return {
            deleteSurveyQuestionId: state.surveyReducer.deleteSurveyQuestionId
        }
    }
)(DeleteSurveyQuestionModal);