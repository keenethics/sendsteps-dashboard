import React, { Component } from 'react';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';
import { connect } from 'react-redux';
import { toggleSelectOnscreen } from '../../actions';
import { isMessageSelected, getOnscreenMessages, getMessageByProperty } from '../../../../../scripts/messageHelper';
import OnscreenToolbar from './toolbars/OnscreenToolbar';

class OnscreenPanel extends Component {

    toggleSelect = message => {
        this.props.dispatch(toggleSelectOnscreen(message.id));
    }

    render() {

        const { messages, selectedOnscreenIds } = this.props;

        return (
            <div className="card mt-3">
                <div className="card-header bg-success">
                    <span className="card-title">
                        <i className="filter-help fa fa-info-circle"></i> Messages live on screen ({getMessageByProperty(messages, 'status', 'showing').length})
                        <span className="pull-right">
                            <FullScreenButton />
                        </span>
                    </span>
                </div>
                <OnscreenToolbar />
                <div className="card-body messages-body">
                    {messages && getOnscreenMessages(messages).map((message, index) => {
                        return (
                            <PanelMessage 
                                key={index} 
                                count={index + 1} 
                                message={message}
                                selected={isMessageSelected(selectedOnscreenIds, message.id)} 
                                onSelect={(value) => this.toggleSelect(message)} 
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
            selectedOnscreenIds: state.messageFilterReducer.selectedOnscreenIds,
            messages: state.messageFilterReducer.messages
        }
    }
) (OnscreenPanel);