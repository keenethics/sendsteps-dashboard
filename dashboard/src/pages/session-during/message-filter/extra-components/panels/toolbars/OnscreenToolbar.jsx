import React, { Component } from 'react';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import { sendToAppeared, clearOnscreenSelect, sendToScreen } from '../../../actions';
import { callAPI } from '../../../../../../actions/api';
import { connect } from 'react-redux';
class OnscreenToolbar extends Component {

    sendIdsToAppeared = () => {
        this.props.dispatch(sendToAppeared(this.props.selectedOnscreenIds));
        this.props.dispatch(
            callAPI(
                'messagefilter',
                'sendToAppeared',
                JSON.stringify({
                    ids: this.props.selectedOnscreenIds
                }),
                sendToScreen(this.props.selectedOnscreenIds)
            )
        );
        this.props.dispatch(clearOnscreenSelect());
    }

    render() {

        const { selectedOnscreenIds } = this.props;

        return (
            <Panel.Footer>
                <ButtonToolbar>
                    <Button onClick={() => this.sendIdsToAppeared()} disabled={selectedOnscreenIds.length < 1} className="pull-right">
                        <i className="fa fa-trash"></i>
                    </Button>
                </ButtonToolbar>
            </Panel.Footer>
        );
    }
}

export default connect(
    (state) => {
        return {
            selectedOnscreenIds: state.messageFilterReducer.selectedOnscreenIds,
        }
    }
) (OnscreenToolbar);