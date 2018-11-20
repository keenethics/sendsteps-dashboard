import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
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
            <Panel bsStyle="info">
                <Panel.Heading>
                    <h4>
                        <i className="filter-help fa fa-info-circle"></i> In Queue 
                        <span className="pull-right">
                            <FullScreenButton />
                        </span>
                    </h4>
                </Panel.Heading>
                <QueueToolbar />
                <Panel.Body className="messages-body">
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
                </Panel.Body>
            </Panel>
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