import React, { Component } from 'react';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';
import { connect } from 'react-redux';
import { toggleSelectAppeared, sendToIncoming, clearAppearedSelect } from '../../actions';
import { isMessageSelected, getAppearedMessages } from '../../../../../scripts/messageHelper';

class AppearedPanel extends Component {

    toggleSelect = message => {
        this.props.dispatch(toggleSelectAppeared(message.id));
    }

    sendIdsToIncoming = () => {
        this.props.dispatch(sendToIncoming(this.props.selectedAppearedIds));
        this.props.dispatch(clearAppearedSelect());
    }

    render() {

        const { messages, selectedAppearedIds } = this.props;

        return (
            <Panel>
                <Panel.Heading>
                    <h4>
                        <i className="filter-help fa fa-info-circle"></i> Appeared on screen 
                        <span className="pull-right">
                            <FullScreenButton />
                        </span>
                    </h4>
                </Panel.Heading>
                <Panel.Footer>
                    <ButtonToolbar>
                        <Button 
                            disabled={selectedAppearedIds.length < 1} 
                            onClick={() => this.sendIdsToIncoming()}>
                            <i className="fa fa-recycle"></i> Back to Incoming
                        </Button>
                    </ButtonToolbar>
                </Panel.Footer>
                <Panel.Body className="messages-body">
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
                </Panel.Body>
            </Panel>
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