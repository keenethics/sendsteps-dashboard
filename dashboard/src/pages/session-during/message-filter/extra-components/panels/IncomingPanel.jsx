import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';
import { connect } from 'react-redux';
import { 
    toggleSelectIncoming, 
    sendToScreen, 
    sendToQueue, 
    clearIncomingSelect, 
    addNewMessage, 
    deleteSelectedMessages, 
    undoRemove, 
    addSelectedToGroup, 
    expandIncomingPanel, 
    selectGroup,
    setGroupDetails,
    updateGroups,
    addNewGroup } from '../../actions';
import { isMessageSelected, getIncomingMessages } from '../../../../../scripts/messageHelper';
import { toast } from 'react-toastify';
import GroupModal from '../modals/GroupModal';
import MessageModal from '../modals/MessageModal';
import IncomingToolbar from './toolbars/IncomingToolbar';
import './Panels.scss';

class IncomingPanel extends Component {

    incomingPanelShowMore = () => {
        this.props.dispatch(expandIncomingPanel(true));
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
            text: this.props.newMessage
        }

        this.props.dispatch(addNewMessage(newMessage));
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



    getGroupColor(groupId) {
        for(let x = 0; x < this.props.messageGroups.length; x++) {
            if(this.props.messageGroups[x].id === groupId) {
                return this.props.messageGroups[x].groupColor;
            }
        }
    }

    deleteGroup(index) {
        let groups = this.props.messageGroups;
        if(index !== -1) {
            groups.splice(index, 1);
            this.props.dispatch(updateGroups(groups));
        }
    }

    setSelectedGroup = e => {
        this.props.dispatch(selectGroup(e.target.value));
    }

    addToGroup = () => {
        this.props.dispatch(addSelectedToGroup(this.props.selectedGroup));
    }

    addGroup = () => {
        const newGroup = {
            id: Math.floor(Math.random() * 1337),
            ...this.props.newMessageGroup
        } 
        this.props.dispatch(addNewGroup(newGroup));
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

        console.log(messages)

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
                    <IncomingToolbar />
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
                <MessageModal />    
                <GroupModal />
            </span>
        );
    }
}

export default connect(
    (state) => {
        return {
            selectedIncomingIds: state.messageFilterReducer.selectedIncomingIds,
            selectedGroup: state.messageFilterReducer.selectedGroup,
            messages: state.messageFilterReducer.messages,
            newMessage: state.messageFilterReducer.newMessage,
            newMessageGroup: state.messageFilterReducer.newMessageGroup
        }
    }
) (IncomingPanel);