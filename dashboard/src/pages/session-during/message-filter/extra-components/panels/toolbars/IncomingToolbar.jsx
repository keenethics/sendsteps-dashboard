import React, { Component } from 'react';
import { Panel, Button, ButtonToolbar, InputGroup, FormGroup } from 'react-bootstrap';
import { 
    sendToScreen, 
    sendToQueue, 
    clearIncomingSelect, 
    selectGroup, 
    toggleGroupsModal, 
    toggleMessageModal, 
    expandIncomingPanel, 
    undoRemove, 
    deleteSelectedMessages, 
    addSelectedToGroup,
} from '../../../actions';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

class IncomingToolbar extends Component {

    sendIdsToScreen = () => {
        this.props.dispatch(sendToScreen(this.props.selectedIncomingIds));
        this.props.dispatch(clearIncomingSelect());
    }

    sendIdsToQueue = () => {
        this.props.dispatch(sendToQueue(this.props.selectedIncomingIds));
        this.props.dispatch(clearIncomingSelect());
    }

    showMessageModal = () => {
        this.props.dispatch(toggleMessageModal(true));
    }

    expandPanel = () => {
        this.props.dispatch(expandIncomingPanel(true));
    }

    undoRemoveMessages = () => {
        this.props.dispatch(undoRemove());
    }

    deleteSelected = () => {
        this.props.dispatch(deleteSelectedMessages(this.props.selectedIncomingIds));
        this.props.dispatch(clearIncomingSelect());
        toast(<div>Message(s) deleted! <span className="pull-right undo" onClick={() => this.undoRemoveMessages()}>UNDO</span></div>);
    }

    addToGroup = () => {
        this.props.dispatch(addSelectedToGroup(this.props.selectedGroupId));
        this.props.dispatch(clearIncomingSelect());
    }

    showGroupModal = () => {
        this.props.dispatch(toggleGroupsModal(true));
    }

    setSelectedGroup = e => {
        this.props.dispatch(selectGroup(e.target.value));
    }

    render() {

        const { incomingPanelExpanded, messageGroups, selectedIncomingIds } = this.props;

        return (
            <Panel.Footer>
                <ButtonToolbar>
                    <Button onClick={() => this.sendIdsToScreen()} disabled={selectedIncomingIds.length < 1} bsStyle="success">Send to Screen</Button>
                    <Button onClick={() => this.sendIdsToQueue()} disabled={selectedIncomingIds.length < 1} bsStyle="primary">Send to Queue</Button>
                    <Button onClick={() => this.showMessageModal()} bsStyle="default">Add Message</Button>
                    <Button onClick={() => this.deleteSelected()} disabled={selectedIncomingIds.length < 1}bsStyle="default"><i className="fa fa-trash"></i></Button>
                    <Button onClick={() => this.expandPanel()} className="pull-right">More <i className="fa fa-chevron-down"></i></Button>
                </ButtonToolbar>
                {incomingPanelExpanded && 
                <ButtonToolbar className="more-toolbar">
                    <InputGroup>
                        <span className="input-group-addon">Add to Group </span>
                        <FormGroup>
                            <select onChange={this.setSelectedGroup.bind(this)} className="form-control">
                                <option value="">None</option>
                                {messageGroups && messageGroups.map((group, index) => {
                                    return <option key={index} value={group.id}>{group.groupName}</option>
                                })}
                            </select>
                        </FormGroup>
                        <span onClick={() => this.addToGroup()} className="input-group-addon btn-success">Add </span>
                    </InputGroup>
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
            selectedGroupId: state.messageFilterReducer.selectedGroupId
        }
    }
) (IncomingToolbar);