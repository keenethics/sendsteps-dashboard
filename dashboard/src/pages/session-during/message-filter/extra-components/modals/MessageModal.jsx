import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InputField from '../../../../../components/common/InputField';
import { toggleMessageModal, addNewMessage } from '../../actions';
import { post } from '../../../../../scripts/api';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

class MessageModal extends Component {

    state = {
        newMessageText: ''
    }

    showNewMessageModal = value => {
        this.props.dispatch(toggleMessageModal(value));
    }

    updateNewMessage = e => {
        this.setState({newMessageText: e.target.value});
    }

    addMessage() {
        const message = {
            // Get these from current props such as session, messageRound
            messageRoundId: 5481,
            participantId: 534149,
            sessionId: 591,
            text: this.state.newMessageText
        }

        post('messagefilter', 'addNewMessage',
            { message },
            messageResult => {
                this.props.dispatch(addNewMessage(messageResult));
                this.setState({newMessageText: ''})
                toast("Message added!");
            },
            error => {
                toast('Unable to add new message...' + error.message);
            }
        )
    }

    render() {

        const { messageModalOpen } = this.props;
        const { newMessageText } = this.state;

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
                        value={newMessageText}
                        placeholder={"Enter new message"}
                        onChange={this.updateNewMessage}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn btn-success" onClick={() => this.addMessage()}><i className="fa fa-plus"></i> Add</div>
                    <div className="btn btn-primary" onClick={() => this.showNewMessageModal(false)}><i className="fa fa-times"></i> Close</div>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(
    (state) => {
        return {
            messageModalOpen: state.messageFilterReducer.messageModalOpen,
            newMessage: state.messageFilterReducer.newMessage
        }
    }
) (MessageModal);