import React, { Component } from 'react';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';
import { connect } from 'react-redux';
import { toggleSelectAppeared } from '../../actions';
import AppearedToolbar from './toolbars/AppearedToolbar';
import { isMessageSelected, getAppearedMessages } from '../../../../../scripts/messageHelper';
import { sortMessages, sortTypes } from '../../../../../scripts/messageSorter';
import SortButton from './SortButton';

class AppearedPanel extends Component {

    state = {
        sortBy: sortTypes.NEWEST,
    }

    setSortType = type => {
        this.setState({sortBy: type})
    }

    toggleSelect = message => {
        this.props.dispatch(toggleSelectAppeared(message.id));
    }

    render() {

        const { messages, selectedAppearedIds } = this.props;
        const { sortBy } = this.state;

        return (
            <div className="card mt-3 appeared mb-3">
                <div className="card-header">
                    <span className="card-title">
                        <i className="filter-help fa fa-info-circle"></i> Appeared on screen ({getAppearedMessages(messages).length})
                        <span className="pull-right">
                            <SortButton sortBy={sortBy} setSortType={this.setSortType} />
                            <FullScreenButton />
                        </span>
                    </span>
                </div>
                <AppearedToolbar />
                <div className="card-body messages-body">
                    {messages && sortMessages(sortBy, getAppearedMessages(messages)).map((message, index) => {
                        return (
                            <PanelMessage 
                                key={index} 
                                count={index + 1} 
                                message={message} 
                                selected={isMessageSelected(selectedAppearedIds, message.id)} 
                                onSelect={() => this.toggleSelect(message)} 
                            />)
                    })}
                    {!getAppearedMessages(messages).length && <>
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
            selectedAppearedIds: state.messageFilterReducer.selectedAppearedIds,
            messages: state.messageFilterReducer.messages
        }
    }
) (AppearedPanel);