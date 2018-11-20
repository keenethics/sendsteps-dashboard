import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import { callAPI } from '../../../../../../actions/api';
import { sendToIncoming, clearAppearedSelect, sendToAppeared } from '../../../actions';
class AppearedToolbar extends Component {

    sendIdsToIncoming = () => {
        this.props.dispatch(sendToIncoming(this.props.selectedAppearedIds));
        this.props.dispatch(
            callAPI(
                'messagefilter',
                'sendToIncoming',
                JSON.stringify({
                    ids: this.props.selectedAppearedIds
                }),
                sendToAppeared(this.props.selectedIncomingIds)
            )
        );
        this.props.dispatch(clearAppearedSelect());
    }

    render() {

        const { selectedAppearedIds } = this.props;

        return (
            <Panel.Footer>
                <ButtonToolbar>
                    <Button 
                        disabled={selectedAppearedIds.length < 1} 
                        onClick={() => this.sendIdsToIncoming()}>
                        <i className="fa fa-recycle"></i> Back to Incoming
                    </Button>
                </ButtonToolbar>
            </Panel.Footer>
        );
    }
}

export default connect(
    (state) => {
        return {
            selectedAppearedIds: state.messageFilterReducer.selectedAppearedIds,
        }
    }
) (AppearedToolbar);