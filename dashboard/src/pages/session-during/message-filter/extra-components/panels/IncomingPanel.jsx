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
import { sortMessages, sortTypes } from '../../../../../scripts/messageSorter';
import SortButton from './SortButton';

class IncomingPanel extends Component {

    state = {
        sortBy: sortTypes.NEWEST,
    }

    setSortType = type => {
        this.setState({sortBy: type})
    }

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
        const { sortBy } = this.state;

        return (
            <span>
                <div className="card mt-3">
                    <div className="card-header bg-primary">
                        <span className="card-title">
                            <i className="filter-help fa fa-info-circle"></i> Incoming Messages ({getIncomingMessages(messages).length})
                            <span className="pull-right">
                                <SortButton sortBy={sortBy} setSortType={this.setSortType} />
                                <FullScreenButton />
                            </span>
                        </span>
                    </div>
                    <IncomingToolbar />
                    <div className="card-body messages-body">
                        {messages && sortMessages(sortBy, getIncomingMessages(messages)).map((message, index) => {
                            return (
                                <PanelMessage 
                                    selected={isMessageSelected(selectedIncomingIds, message.id)} 
                                    onSelect={() => this.toggleSelect(message.id)} 
                                    key={index} count={index + 1} 
                                    message={message} 
                                />)
                        })}
                        {!getIncomingMessages(messages).length && <>
                            <div className="card-body text-center">
                                <small> <i className="fa fa-exclamation-triangle "></i> No Messages Available</small>
                            </div>
                        </>}
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