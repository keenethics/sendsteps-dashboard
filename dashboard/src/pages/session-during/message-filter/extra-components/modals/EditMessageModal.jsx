import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InputField from '../../../../../components/common/InputField';
import { toggleMessageModal, addNewMessage, deleteSelectedMessages } from '../../actions';
import { callAPI } from '../../../../../actions/api';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

class MessageModal extends Component {

    state = {
        updatedMessage: this.getSelectedMessage()
    }

    showNewMessageModal = value => {
        this.props.dispatch(toggleMessageModal(value));
    }

    componentDidMount() {
        this.getSelectedMessage();
    }

    getSelectedMessage() {
        const { messages, selectedIncomingIds } = this.props;
        for(let x = 0; x < messages.length; x++) {
            if(messages[x].id === selectedIncomingIds[0]) {
                this.setState({updatedMessage: messages[x].text});
            }
        }
    }

    updateMessage = e => {
        this.setState({updatedMessage: e.target.value});
    }

    // updateMessage() {
    //     this.props.dispatch(addNewMessage(newMessage));
    //     this.props.dispatch(
    //         callAPI(
    //             'messagefilter',
    //             'editMessage',
    //             JSON.stringify(newMessage),
    //             deleteSelectedMessages()
    //         )
    //     );
    //     this.setState({newMessageText: ''})
    //     toast("Message updated!");
    // }

    render() {

        const { messageModalOpen } = this.props;
        const { updatedMessage } = this.state;

        return (
            <Modal show={messageModalOpen} onHide={() => this.showNewMessageModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputField 
                        inputId="edit-message"
                        leftFaIcon={"comment"}
                        clearButton={true}
                        labelText={"Message"}
                        value={updatedMessage}
                        placeholder={"Edit the message"}
                        onChange={this.updateMessage}
                    />
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button bsStyle={"success"} onClick={() => this.updateMessage()}><i className="fa fa-plus"></i> Save</Button> */}
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
            selectedIncomingIds: state.messageFilterReducer.selectedIncomingIds,
            messages: state.messageFilterReducer.messages,
        }
    }
) (MessageModal);