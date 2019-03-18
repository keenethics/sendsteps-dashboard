import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendToScreen, sendToIncoming, clearQueueSelect } from '../../../actions';
import { post } from '../../../../../../scripts/api';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { toast } from 'react-toastify';

class QueueToolbar extends Component {

    sendIdsToScreen = () => {
        post('messagefilter', 'sendToScreen',
            { ids: this.props.selectedQueueIds },
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
        post('messagefilter', 'sendToIncoming',
            { ids: this.props.selectedQueueIds },
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
            <div className="card-footer pt-0">
                <ButtonToolbar>
                    <div className="btn btn-success mt-2 mr-2" disabled={selectedQueueIds.length < 1} onClick={() => this.sendIdsToScreen()}>Send to Screen</div>
                    <div className="btn btn-primary mt-2 mr-2" disabled={selectedQueueIds.length < 1} onClick={() => this.sendIdsToIncoming()}>Send to Incoming</div>
                </ButtonToolbar>
            </div>
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