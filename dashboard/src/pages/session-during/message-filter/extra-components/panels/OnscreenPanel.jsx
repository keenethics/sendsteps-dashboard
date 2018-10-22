import React, { Component } from 'react';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';
import { connect } from 'react-redux';
import { toggleSelectOnscreen, sendToAppeared, clearOnscreenSelect } from '../../actions';
import { isMessageSelected, getOnscreenMessages } from '../../../../../scripts/messageHelper';

class OnscreenPanel extends Component {

    toggleSelect = message => {
        this.props.dispatch(toggleSelectOnscreen(message.id));
    }

    sendIdsToAppeared = () => {
        this.props.dispatch(sendToAppeared(this.props.selectedOnscreenIds));
        this.props.dispatch(clearOnscreenSelect());
    }

    render() {

        const { messages, selectedOnscreenIds } = this.props;

        return (
            <Panel bsStyle="success">
                <Panel.Heading>
                    <h4>
                        <i className="filter-help fa fa-info-circle"></i> Messages live on screen 
                        <span className="pull-right">
                            <FullScreenButton />
                        </span>
                    </h4>
                </Panel.Heading>
                <Panel.Footer>
                    <ButtonToolbar>
                        <Button onClick={() => this.sendIdsToAppeared()} disabled={selectedOnscreenIds.length < 1} className="pull-right">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </ButtonToolbar>
                </Panel.Footer>
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