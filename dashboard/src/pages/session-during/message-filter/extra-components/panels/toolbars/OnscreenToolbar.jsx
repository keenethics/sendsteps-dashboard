import React, { Component } from 'react';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import { sendToAppeared, clearOnscreenSelect } from '../../../actions';
import { post } from '../../../../../../scripts/api';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
class OnscreenToolbar extends Component {

    sendIdsToAppeared = () => {
        post('messagefilter', 'sendToAppeared',
            JSON.stringify({ids: this.props.selectedOnscreenIds}),
            result => {
                this.props.dispatch(sendToAppeared(result));
                this.props.dispatch(clearOnscreenSelect());
            },
            error => {
                toast(`Unable to remove messages... [${error}]`);
            }
        )
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