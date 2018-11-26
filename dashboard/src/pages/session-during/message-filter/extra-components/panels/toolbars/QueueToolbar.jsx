import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendToScreen, sendToIncoming, clearQueueSelect } from '../../../actions';
import { post } from '../../../../../../scripts/api';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import { toast } from 'react-toastify';

class QueueToolbar extends Component {

    sendIdsToScreen = () => {
        post(
            'messagefilter', 'sendToScreen',
            JSON.stringify({ids: this.props.selectedQueueIds}),
            result => {
                this.props.dispatch(sendToScreen(result));
                this.props.dispatch(clearQueueSelect());
            },
            error => {
                toast(`Unable to send messages to screen... [${error}]`);
            }
        )
    }

    sendIdsToIncoming = () => {
        post(
            'messagefilter', 'sendToIncoming',
            JSON.stringify({ids: this.props.selectedQueueIds}),
            result => {
                this.props.dispatch(sendToIncoming(result));
                this.props.dispatch(clearQueueSelect());
            },
            error => {
                toast(`Unable to send messages to incoming... [${error}]`);
            }
        )
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