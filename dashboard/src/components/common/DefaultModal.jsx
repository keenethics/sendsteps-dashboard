import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/app';
import { Modal, Button } from 'react-bootstrap';

class DefaultModal extends React.Component {

    handleClose() {
        this.props.dispatch(toggleModal(false));
    }

    render() {

        const { modalOpen, title, content, onConfirm } = this.props;

        return (
            <Modal show={modalOpen} onHide={this.handleClose.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {content}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" onClick={onConfirm}><i className="fa fa-save"></i> Save</Button>
                    <Button onClick={this.handleClose.bind(this)}><i className="fa fa-times"></i> Close</Button>
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