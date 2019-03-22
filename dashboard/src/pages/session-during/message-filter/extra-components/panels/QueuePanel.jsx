import React, { Component } from 'react';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';
import { connect } from 'react-redux';
import { toggleSelectQueue } from '../../actions';
import { isMessageSelected, getQueueMessages } from '../../../../../scripts/messageHelper';
import QueueToolbar from './toolbars/QueueToolbar';
import { sortMessages, sortTypes } from '../../../../../scripts/messageSorter';
import SortButton from './SortButton';
class QueuePanel extends Component {

    state = {
        sortBy: sortTypes.NEWEST,
    }

    setSortType = type => {
        this.setState({sortBy: type})
    }

    toggleSelect = message => {
        this.props.dispatch(toggleSelectQueue(message.id));
    };

    render() {

        const { messages, selectedQueueIds } = this.props;
        const { sortBy } = this.state;

        return (
            <div className="card mt-3">
                <div className="card-header bg-info">
                    <span className="card-title">
                        <i className="filter-help fa fa-info-circle"></i> In Queue ({getQueueMessages(messages).length})
                        <span className="pull-right">
                            <SortButton sortBy={sortBy} setSortType={this.setSortType} />
                            <FullScreenButton />
                        </span>
                    </span>
                </div>
                <QueueToolbar />
                <div className="card-body messages-body">
                    {messages && sortMessages(sortBy, getQueueMessages(messages)).map((message, index) => {
                        return (
                            <PanelMessage 
                                key={index} 
                                count={index + 1} 
                                message={message} 
                                selected={isMessageSelected(selectedQueueIds, message.id)} 
                                onSelect={() => this.toggleSelect(message)} 
                            />)
                    })}
                    {!getQueueMessages(messages).length && <>
                        <div className="card-body text-center">
                            <small> <i className="fa fa-exclamation-triangle "></i> No Messages Available</small>
                        </div>
                    </>}
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