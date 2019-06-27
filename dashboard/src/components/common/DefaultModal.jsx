import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from 'App/actions/app';
import { Modal } from 'react-bootstrap';

class DefaultModal extends React.Component {

    handleClose() {
        this.props.dispatch(toggleModal(false));
    }

    render() {

        const { modalOpen, title, content, onConfirm, confirmText, cancelText } = this.props;

        return (
            <Modal show={modalOpen} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {content}
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn btn-sm btn-outline-primary" onClick={onConfirm}>{confirmText ? confirmText : "Save"}</div>
                    <div className="btn btn-sm btn-outline-secondary" onClick={this.handleClose.bind(this)}>{cancelText ? cancelText : "Close"}</div>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default connect(
    (state) => {
        return {
            modalOpen: state.appReducer.modalOpen,
        }
    }
) (DefaultModal);