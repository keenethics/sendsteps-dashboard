import React, { Component } from 'react';
import { Panel, Button, ButtonToolbar, InputGroup, FormGroup, Modal } from 'react-bootstrap';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';
import { connect } from 'react-redux';
import InputField from '../../../../../components/common/InputField';
import { toggleSelectIncoming, sendToScreen, sendToQueue, clearIncomingSelect, addNewMessage, deleteSelectedMessages, undoRemove } from '../../actions';
import { isMessageSelected, getIncomingMessages } from '../../../../../scripts/messageHelper';
import { toast } from 'react-toastify';
import './Panels.scss';

class IncomingPanel extends Component {

    state = {
        showMoreIncoming: false,
        newMessageModalOpen: false,
        newMessageContent: ''
    }

    incomingPanelShowMore = () => {
        this.setState({showMoreIncoming: !this.state.showMoreIncoming});
    }

    showNewMessageModal = value => {
        this.setState({newMessageModalOpen: value})
    }

    updateNewMessage(e) {
        console.log(e.target.value);
        this.setState({newMessageContent: e.target.value});
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
            text: this.state.newMessageContent
        }

        this.props.dispatch(addNewMessage(newMessage));
        this.setState({
            newMessageModalOpen: false,
            newMessageContent: ''
        });
        toast("Message added!");
    }

    toggleSelect = id => {
        this.props.dispatch(toggleSelectIncoming(id));
    }

    sendIdsToScreen = () => {
        this.props.dispatch(sendToScreen(this.props.selectedIncomingIds));
        this.props.dispatch(clearIncomingSelect());
    }

    sendIdsToQueue = () => {
        this.props.dispatch(sendToQueue(this.props.selectedIncomingIds));
        this.props.dispatch(clearIncomingSelect());
    }

    undoRemoveMessages = () => {
        this.props.dispatch(undoRemove());
    }

    deleteSelected = () => {
        this.props.dispatch(deleteSelectedMessages(this.props.selectedIncomingIds));
        this.props.dispatch(clearIncomingSelect());
        toast(this.ToastUndo);
    }

    ToastUndo = () => {
        return (
          <div>
              Message(s) deleted! <span className="pull-right undo" onClick={() => this.undoRemoveMessages()}>UNDO</span>
          </div>
        );
      }

    render() {

        const { messages, selectedIncomingIds } = this.props;
        const { showMoreIncoming, newMessageModalOpen } = this.state;

        return (
            <span>
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        <h4>
                            <i className="filter-help fa fa-info-circle"></i> Incoming Messages 
                            <span className="pull-right">
                                <FullScreenButton />
                            </span>
                        </h4>
                    </Panel.Heading>
                    <Panel.Footer>
                        <ButtonToolbar>
                            <Button onClick={() => this.sendIdsToScreen()} disabled={selectedIncomingIds.length < 1} bsStyle="success">Send to Screen</Button>
                            <Button onClick={() => this.sendIdsToQueue()} disabled={selectedIncomingIds.length < 1} bsStyle="primary">Send to Queue</Button>
                            <Button onClick={() => this.showNewMessageModal(true)} bsStyle="default">Add Message</Button>
                            <Button onClick={() => this.deleteSelected()} disabled={selectedIncomingIds.length < 1}bsStyle="default"><i className="fa fa-trash"></i></Button>
                            <Button onClick={() => this.incomingPanelShowMore()} className="pull-right">More <i className="fa fa-chevron-down"></i></Button>
                        </ButtonToolbar>
                        {showMoreIncoming && 
                        <ButtonToolbar className="more-toolbar">
                            <InputGroup>
                                <span className="input-group-addon">Add to Group </span>
                                <FormGroup>
                                    <select className="form-control">
                                        <option value="select">None</option>
                                        <option value="other">...</option>
                                    </select>
                                </FormGroup>
                                <span className="input-group-addon btn-success">Add </span>
                            </InputGroup>
                            <Button bsStyle="default">My Groups</Button>
                            <Button bsStyle="default">Send to...</Button>
                        </ButtonToolbar>}
                </Panel.Footer>

                <Panel.Body className="messages-body">
                    {messages && getIncomingMessages(messages).map((message, index) => {
                        return (
                            <PanelMessage 
                                selected={isMessageSelected(selectedIncomingIds, message.id)} 
                                onSelect={() => this.toggleSelect(message.id)} 
                                key={index} count={index + 1} 
                                message={message} 
                            />)
                    })}
                </Panel.Body>
            </Panel>
                <Modal show={newMessageModalOpen} onHide={() => this.showNewMessageModal(false)}>
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
                            onChange={this.updateNewMessage.bind(this)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle={"success"} onClick={() => this.addMessage()}><i className="fa fa-plus"></i> Add</Button>
                        <Button onClick={() => this.showNewMessageModal(false)}><i className="fa fa-times"></i> Close</Button>
                    </Modal.Footer>
                </Modal>
            </span>
            
        );
    }
}

export default connect(
    (state) => {
        return {
            selectedIncomingIds: state.messageFilterReducer.selectedIncomingIds,
            messages: state.messageFilterReducer.messages
        }
    }
) (IncomingPanel);