import React, { Component } from 'react';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';
import { connect } from 'react-redux';
import { toggleSelectAppeared } from '../../actions';
import AppearedToolbar from './toolbars/AppearedToolbar';
import { isMessageSelected, getAppearedMessages } from '../../../../../scripts/messageHelper';

class AppearedPanel extends Component {

    toggleSelect = message => {
        this.props.dispatch(toggleSelectAppeared(message.id));
    }

    render() {

        const { messages, selectedAppearedIds } = this.props;

        return (
            <div className="card mt-3 appeared">
                <div className="card-header">
                    <span className="card-title">
                        <i className="filter-help fa fa-info-circle"></i> Appeared on screen ({getAppearedMessages(messages).length})
                        <span className="pull-right">
                            <FullScreenButton />
                        </span>
                    </span>
                </div>
                <AppearedToolbar />
                <div className="card-body messages-body">
                    {messages && getAppearedMessages(messages).map((message, index) => {
                        return (
                            <PanelMessage 
                                key={index} 
                                count={index + 1} 
                                message={message} 
                                selected={isMessageSelected(selectedAppearedIds, message.id)} 
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
            selectedAppearedIds: state.messageFilterReducer.selectedAppearedIds,
            messages: state.messageFilterReducer.messages
        }
    }
) (AppearedPanel);