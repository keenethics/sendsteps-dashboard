import React, { Component } from 'react';
import { Panel, Button, ButtonToolbar, InputGroup, FormGroup } from 'react-bootstrap';
import { 
    sendToScreen, 
    sendToQueue, 
    clearIncomingSelect, 
    selectGroup, 
    toggleGroupsModal, 
    toggleMessageModal, 
    toggleEditMessageModal,
    expandIncomingPanel, 
    undoRemove, 
    sendToIncoming,
    addSelectedToGroup
} from '../../../actions';
import { post } from '../../../../../../scripts/api';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

class IncomingToolbar extends Component {

    sendIdsToScreen = () => {
        post('messagefilter','sendToScreen',
            JSON.stringify({
                ids: this.props.selectedIncomingIds
            }),
            result => {
                this.props.dispatch(sendToScreen(result));
                this.props.dispatch(clearIncomingSelect());
                toast('Messages sent to screen!');
            },
            error => {
                toast(`Unable to send messages to screen... ${error}`);
            }
        )
    }

    sendIdsToQueue = () => {
        post('messagefilter','sendToQueue',
            JSON.stringify({
                ids: this.props.selectedIncomingIds
            }),
            result => {
                console.log(result);
                this.props.dispatch(sendToQueue(result));
                this.props.dispatch(clearIncomingSelect());
                toast('Messages sent to queue!');
            },
            error => {
                toast(`Unable to send messages to queue... ${error}`);
            }
        )
    }

    showMessageModal = () => {
        this.props.dispatch(toggleMessageModal(true));
    }

    showEditMessageModal = () => {
        this.props.dispatch(toggleEditMessageModal(true));
    }

    expandPanel = () => {
        this.props.dispatch(expandIncomingPanel(true));
    }

    undoRemoveMessages = () => {
        if(!this.props.lastDeletedMessages) {
            return false;
        }
        const deletedIds = this.props.lastDeletedMessages.map(message => {
            return message.id
        });

        post('messagefilter','sendToIncoming',
            JSON.stringify({
                ids: deletedIds
            }),
            result => {
                this.props.dispatch(undoRemove());
                toast('Messages restored!');
            },
            error => {
                toast(`Unable to undo action... ${error}`);
            }
        )
    }

    deleteSelected = () => {
        post('messagefilter','deleteMessages',
            JSON.stringify({
                ids: this.props.selectedIncomingIds
            }),
            result => {
                this.props.dispatch(sendToIncoming(result));
                this.props.dispatch(clearIncomingSelect());
                toast(<div>
                        Message(s) deleted! 
                        <span className="pull-right undo" onClick={() => this.undoRemoveMessages()}>
                            UNDO
                        </span>
                    </div>);
            },
            error => {
                toast(`Unable to remove messages... ${error}`);
            }
        )
    }

    addToGroup = () => {
        post('messagefilter','addToGroup',
            JSON.stringify({
                groupId: this.props.selectedGroupId,
                selectedIds: this.props.selectedIncomingIds
            }),
            result => {
                this.props.dispatch(addSelectedToGroup(result));
                this.props.dispatch(clearIncomingSelect());
                toast('Messages added to group!');
            },
            error => {
                toast(`Unable to add messages to group... ${error}`);
            }
        )
    }

    showGroupModal = () => {
        this.props.dispatch(toggleGroupsModal(true));
    }

    setSelectedGroup = e => {
        this.props.dispatch(selectGroup(e.target.value));
    }

    render() {

        const { incomingPanelExpanded, messageGroups, selectedIncomingIds, messages } = this.props;

        return (
            <Panel.Footer>
                <ButtonToolbar>
                    <Button onClick={() => this.sendIdsToScreen()} disabled={selectedIncomingIds.length < 1} bsStyle="success">Send to Screen</Button>
                    <Button onClick={() => this.sendIdsToQueue()} disabled={selectedIncomingIds.length < 1} bsStyle="primary">Send to Queue</Button>
                    {selectedIncomingIds.length < 1 && <Button  onClick={() => this.showMessageModal()} bsStyle="default">Add Message</Button>}
                    {selectedIncomingIds.length >= 1 && <Button disabled={selectedIncomingIds.length > 1} onClick={() => this.showEditMessageModal()} bsStyle="default">Edit Message</Button>}
                    <Button onClick={() => this.deleteSelected()} disabled={selectedIncomingIds.length < 1}bsStyle="default"><i className="fa fa-trash"></i></Button>
                    <Button onClick={() => this.expandPanel()} className="pull-right">More <i className="fa fa-chevron-down"></i></Button>
                </ButtonToolbar>
                {incomingPanelExpanded && 
                <ButtonToolbar className="more-toolbar">
                    <InputGroup>
                        <span className="input-group-addon">Add to Group </span>
                        <FormGroup>
                            <select onChange={this.setSelectedGroup.bind(this)} className="form-control">
                                <option value={false}>None</option>
                                {messageGroups && Object.keys(messageGroups).map(group => {
                                    return (
                                        <option key={group} value={group}>
                                            {messageGroups[group].name} 
                                        </option>
                                    )
                                })}
                            </select>
                        </FormGroup>
                    </InputGroup>
                    <Button disabled={selectedIncomingIds.length < 1}onClick={() => this.addToGroup()} >Add </Button>
                    <Button onClick={() => this.showGroupModal(true)}bsStyle="default">My Groups</Button>
                    <Button bsStyle="default">Send to...</Button>
                </ButtonToolbar>}
            </Panel.Footer>
        );
    }
}

export default connect(
    (state) => {
        return {
            incomingPanelExpanded: state.messageFilterReducer.incomingPanelExpanded,
            messageGroups: state.messageFilterReducer.messageGroups,
            selectedIncomingIds: state.messageFilterReducer.selectedIncomingIds,
            selectedGroupId: state.messageFilterReducer.selectedGroupId,
            lastDeletedMessages: state.messageFilterReducer.lastDeletedMessages,
            messages: state.messageFilterReducer.messages

        }
    }
) (IncomingToolbar);