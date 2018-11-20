import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendToScreen, sendToIncoming, clearQueueSelect, sendToQueue } from '../../../actions';
import { callAPI } from '../../../../../../actions/api';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';

class QueueToolbar extends Component {

    sendIdsToScreen = () => {
        this.props.dispatch(sendToScreen(this.props.selectedQueueIds));
        this.props.dispatch(
            callAPI(
                'messagefilter',
                'sendToScreen',
                JSON.stringify({
                    ids: this.props.selectedQueueIds
                }),
                sendToQueue(this.props.selectedIncomingIds)
            )
        );
        this.props.dispatch(clearQueueSelect());
    }

    sendIdsToIncoming = () => {
        this.props.dispatch(sendToIncoming(this.props.selectedQueueIds));
        this.props.dispatch(
            callAPI(
                'messagefilter',
                'sendToIncoming',
                JSON.stringify({
                    ids: this.props.selectedQueueIds
                }),
                sendToQueue(this.props.selectedIncomingIds)
            )
        );
        this.props.dispatch(clearQueueSelect());
    }

    render() {

        const { selectedQueueIds } = this.props;

        return (
            <Panel.Footer>
                <ButtonToolbar>
                    <Button disabled={selectedQueueIds.length < 1} onClick={() => this.sendIdsToScreen()} bsStyle="success">Send to Screen</Button>
                    <Button disabled={selectedQueueIds.length < 1} onClick={() => this.sendIdsToIncoming()}bsStyle="primary">Send to Incoming</Button>
                </ButtonToolbar>
            </Panel.Footer>
        );
    }
}

export default connect(
    (state) => {
        return {
            selectedQueueIds: state.messageFilterReducer.selectedQueueIds,
        }
    }
) (QueueToolbar);