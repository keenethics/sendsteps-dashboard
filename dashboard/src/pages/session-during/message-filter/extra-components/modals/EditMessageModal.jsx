import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import InputField from '../../../../../components/common/InputField';
import { toggleMessageModal, addNewMessage, deleteSelectedMessages } from '../../actions';
import { connect } from 'react-redux';

class EditMessageModal extends Component {

    state = {
        updatedMessage: ""
    }

    showNewMessageModal = value => {
        this.props.dispatch(toggleMessageModal(value));
    }

    componentWillReceiveProps(prevProps, nextProps) {
        const { messages, selectedIncomingIds } = nextProps;

        if(selectedIncomingIds && messages) {
            this.getSelectedMessage();
        }
    }

    getSelectedMessage() {
        const { selectedIncomingIds, messages } = this.props;

        messages.forEach(message => {
            if(message.id === selectedIncomingIds[0]) {
                this.setState({updatedMessage: message.text});
            }
        })
    }

    updateMessage = e => {
        this.setState({updatedMessage: e.target.value});
    }

    render() {

        const { EditmessageModalOpen, messages, selectedIncomingIds } = this.props;
        const { updatedMessage } = this.state;
        return (
            <Modal show={EditmessageModalOpen} onHide={() => this.showNewMessageModal(false)}>
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
            EditmessageModalOpen: state.messageFilterReducer.EditmessageModalOpen,
            selectedIncomingIds: state.messageFilterReducer.selectedIncomingIds,
            messages: state.messageFilterReducer.messages,
        }
    }
) (EditMessageModal);