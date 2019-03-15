import React, { Component } from 'react';
import { Button, ButtonToolbar, InputGroup, FormGroup, Collapse } from 'react-bootstrap';
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
            { ids: this.props.selectedIncomingIds },
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
            { ids: this.props.selectedIncomingIds },
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
        this.props.dispatch(expandIncomingPanel(!this.props.incomingPanelExpanded));
    }

    undoRemoveMessages = () => {
        if(!this.props.lastDeletedMessages) {
            return false;
        }
        const deletedIds = this.props.lastDeletedMessages.map(message => {
            return message.id
        });

        post('messagefilter','sendToIncoming',
            { ids: deletedIds },
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
            {ids: this.props.selectedIncomingIds },
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
            {
                groupId: this.props.selectedGroupId,
                selectedIds: this.props.selectedIncomingIds
            },
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
            <div className="card-footer pt-0">
                <div>
                    <button className="btn btn-success mr-2 mt-2" onClick={() => this.sendIdsToScreen()} disabled={selectedIncomingIds.length < 1}>Send to Screen</button>
                    <button className="btn btn-primary mr-2 mt-2" onClick={() => this.sendIdsToQueue()} disabled={selectedIncomingIds.length < 1}>Send to Queue</button>
                    {selectedIncomingIds.length < 1 && <button className="btn btn-outline-secondary mr-2 mt-2"  onClick={() => this.showMessageModal()}>Add Message</button>}
                    {selectedIncomingIds.length >= 1 && <button className="btn btn-outline-secondary mr-2 mt-2" disabled={selectedIncomingIds.length > 1} onClick={() => this.showEditMessageModal()}>Edit Message</button>}
                    <button className="btn btn-outline-secondary mr-2 mt-2" onClick={() => this.deleteSelected()} disabled={selectedIncomingIds.length < 1}><i className="fa fa-trash"></i></button>
                    <button className="btn btn-primary mr-2 mt-2 float-right" onClick={() => this.expandPanel()} >More {incomingPanelExpanded ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}</button>
                </div>
                <Collapse in={incomingPanelExpanded}>
                    <div>
                        <div className="btn-toolbar">
                            <div className="input-group mr-2 mt-2">
                                <div className="input-group-prepend">
                                    <label className="input-group-text">
                                        Add to Group 
                                    </label>
                                </div>
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
                            </div>
                            <div className="btn btn-primary mr-2 mt-2" disabled={selectedIncomingIds.length < 1}onClick={() => this.addToGroup()} >Add </div>
                            <div className="btn btn-outline-secondary mr-2 mt-2" onClick={() => this.showGroupModal(true)}>My Groups</div>
                            <div className="btn btn-outline-secondary mt-2">Send to...</div>
                        </div>
                    </div>
                </Collapse>
            </div>
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