import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
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
            <Panel bsStyle="success">
                <Panel.Heading>
                    <h4>
                        <i className="filter-help fa fa-info-circle"></i> Messages live on screen ({getMessageByProperty(messages, 'status', 'showing').length})
                        <span className="pull-right">
                            <FullScreenButton />
                        </span>
                    </h4>
                </Panel.Heading>
                <OnscreenToolbar />
                <Panel.Body className="messages-body">
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
                </Panel.Body>
            </Panel>
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