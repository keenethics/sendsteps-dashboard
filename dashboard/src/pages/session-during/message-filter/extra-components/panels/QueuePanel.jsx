import React, { Component } from 'react';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';
import { connect } from 'react-redux';
import { toggleSelectQueue, sendToScreen, sendToIncoming, clearQueueSelect } from '../../actions';
import { isMessageSelected, getQueueMessages } from '../../../../../scripts/messageHelper';
class QueuePanel extends Component {

    toggleSelect = message => {
        this.props.dispatch(toggleSelectQueue(message.id));
    };

    sendIdsToScreen = () => {
        this.props.dispatch(sendToScreen(this.props.selectedQueueIds));
        this.props.dispatch(clearQueueSelect());
    }

    sendIdsToIncoming = () => {
        this.props.dispatch(sendToIncoming(this.props.selectedQueueIds));
        this.props.dispatch(clearQueueSelect());
    }

    sendIdsToScreen = () => {
        this.props.dispatch(sendToScreen(this.props.selectedQueueIds));
        this.props.dispatch(clearQueueSelect());
    }

    sendIdsToIncoming = () => {
        this.props.dispatch(sendToIncoming(this.props.selectedQueueIds));
        this.props.dispatch(clearQueueSelect());
    }


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
                <Panel.Footer>
                    <ButtonToolbar>
                        <Button disabled={selectedQueueIds.length < 1} onClick={() => this.sendIdsToScreen()} bsStyle="success">Send to Screen</Button>
                        <Button disabled={selectedQueueIds.length < 1} onClick={() => this.sendIdsToIncoming()}bsStyle="primary">Send to Incoming</Button>
                    </ButtonToolbar>
                </Panel.Footer>
                <Panel.Body className="messages-body">
                    <ul className="list-group">
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
                    </ul>
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