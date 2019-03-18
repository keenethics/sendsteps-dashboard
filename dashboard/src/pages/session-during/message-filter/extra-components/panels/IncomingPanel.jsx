import React, { Component } from 'react';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';
import { connect } from 'react-redux';
import { toggleSelectIncoming }  from '../../actions';
import { isMessageSelected, getIncomingMessages } from '../../../../../scripts/messageHelper';
import GroupModal from '../modals/GroupModal';
import MessageModal from '../modals/MessageModal';
import IncomingToolbar from './toolbars/IncomingToolbar';
import './Panels.scss';
import EditMessageModal from '../modals/EditMessageModal';

class IncomingPanel extends Component {

    toggleSelect = id => {
    this.props.dispatch(toggleSelectIncoming(id));
    }

    getGroupColor(groupId) {
        for(let x = 0; x < this.props.messageGroups.length; x++) {
            if(this.props.messageGroups[x].id === groupId) {
                return this.props.messageGroups[x].groupColor;
            }
        }
    }

    render() {

        const { messages, selectedIncomingIds } = this.props;

        return (
            <span>
                <div className="card mt-3">
                    <div className="card-header bg-primary">
                        <span className="card-title">
                            <i className="filter-help fa fa-info-circle"></i> Incoming Messages ({getIncomingMessages(messages).length})
                            <span className="pull-right">
                                <FullScreenButton />
                            </span>
                        </span>
                    </div>
                    <IncomingToolbar />
                    <div className="card-body messages-body">
                        {messages && getIncomingMessages(messages).map((message, index) => {
                            return (
                                <PanelMessage 
                                    selected={isMessageSelected(selectedIncomingIds, message.id)} 
                                    onSelect={() => this.toggleSelect(message.id)} 
                                    key={index} count={index + 1} 
                                    message={message} 
                                />)
                        })}
                    </div>
                </div>
                <MessageModal />    
                <EditMessageModal />
                <GroupModal />
            </span>
        );
    }
}

export default connect(
    (state) => {
        return {
            selectedIncomingIds: state.messageFilterReducer.selectedIncomingIds,
            selectedGroupId: state.messageFilterReducer.selectedGroupId,
            messages: state.messageFilterReducer.messages,
            newMessage: state.messageFilterReducer.newMessage,
            newMessageGroup: state.messageFilterReducer.newMessageGroup
        }
    }
) (IncomingPanel);