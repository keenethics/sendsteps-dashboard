import React, { Component } from 'react';
import { setDeletingIdentificationId } from '../actions'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { post } from '../../../../scripts/api';
import { toast } from 'react-toastify';


class DeleteIdentificationQuestionModal extends Component {

    toggleClose = () => {
        this.props.dispatch(setDeletingIdentificationId(null))
    }

    deleteIdentificationQuestion = () => {
        const { deleteIdentificationQuestionId } = this.props

        post(
            'audienceidentification',
            'deleteIdentificationQuestion',
            { id: deleteIdentificationQuestionId },
            () => {
                this.props.getIdentificationQuestions()
                this.props.dispatch(setDeletingIdentificationId(null))
                toast("Identification question removed!")
            },
            err => {
                console.log(err)
                this.props.dispatch(setDeletingIdentificationId(null))
                toast("Unable to remove identification question." + err.message)
            }
        )
    }

    render() {

        const { deleteIdentificationQuestionId } = this.props

        return (
            <Modal show={!!deleteIdentificationQuestionId} onHide={this.toggleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete identification question?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12">
                            Are you sure you want to delete this identification question?
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn btn-danger" className="pull-left" onClick={this.deleteIdentificationQuestion}><i className="fa fa-trash"></i> Delete</div>
                    <div className="btn btn-primary" onClick={this.toggleClose}><i className="fa fa-times"></i> Cancel</div>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    state => {
        return {
            deleteIdentificationQuestionId: state.audienceReducer.deleteIdentificationQuestionId
        }
    }
)(DeleteIdentificationQuestionModal);