import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InputField from '../../../../../components/common/InputField';
import { toggleMessageModal, setMessageText } from '../../actions';
import { connect } from 'react-redux';

class MessageModal extends Component {

    showNewMessageModal = value => {
        this.props.dispatch(toggleMessageModal(value));
    }

    updateNewMessage(e) {
        this.props.dispatch(setMessageText(e.target.value));
    }

    render() {

        const { messageModalOpen } = this.props;

        return (
            <Modal show={messageModalOpen} onHide={() => this.showNewMessageModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputField 
                        inputId="new-message"
                        leftFaIcon={"comment"}
                        clearButton={true}
                        labelText={"Message"}
                        placeholder={"Enter new message"}
                        onChange={() => this.updateNewMessage()}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle={"success"} onClick={() => this.addMessage()}><i className="fa fa-plus"></i> Add</Button>
                    <Button onClick={() => this.showNewMessageModal(false)}><i className="fa fa-times"></i> Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    (state) => {
        return {
            messageModalOpen: state.messageFilterReducer.messageModalOpen,
        }
    }
) (MessageModal);