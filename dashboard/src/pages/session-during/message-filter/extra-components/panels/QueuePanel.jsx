import React, { Component } from 'react';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';
import { connect } from 'react-redux';
import { toggleSelectQueue } from '../../actions';
import { isMessageSelected, getQueueMessages } from '../../../../../scripts/messageHelper';
import QueueToolbar from './toolbars/QueueToolbar';
class QueuePanel extends Component {

    toggleSelect = message => {
        this.props.dispatch(toggleSelectQueue(message.id));
    };

    render() {

        const { messages, selectedQueueIds } = this.props;

        return (
            <div className="card mt-3">
                <div className="card-header bg-info">
                    <span className="card-title">
                        <i className="filter-help fa fa-info-circle"></i> In Queue ({getQueueMessages(messages).length})
                        <span className="pull-right">
                            <FullScreenButton />
                        </span>
                    </span>
                </div>
                <QueueToolbar />
                <div className="card-body messages-body">
                    {messages && getQueueMessages(messages).map((message, index) => {
                        return (
                            <PanelMessage 
                                key={index} 
                                count={index + 1} 
                                message={message} 
                                selected={isMessageSelected(selectedQueueIds, message.id)} 
                                onSelect={() => this.toggleSelect(message)} 
                            />)
                    })}
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            selectedQueueIds: state.messageFilterReducer.selectedQueueIds,
            messages: state.messageFilterReducer.messages
        }
    }
) (QueuePanel);