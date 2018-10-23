import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InputField from '../../../../../components/common/InputField';
import { toggleMessageModal, addNewMessage } from '../../actions';
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
        const newMessage = {
            id: Math.floor(Math.random() * 999999),
            connection: null,
            destination: "-",
            groupId: null,
            messageRoundId: 5481,
            participantId: 534149,
            sessionId: 591,
            source: "",
            starred: null,
            upvoteCount: Math.floor(Math.random() * 30),
            status: "unread",
            text: this.state.newMessageText
        }

        this.props.dispatch(addNewMessage(newMessage));
        this.setState({newMessageText: ''})
        toast("Message added!");
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
            newMessage: state.messageFilterReducer.newMessage
        }
    }
) (MessageModal);