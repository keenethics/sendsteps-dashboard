import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { post } from '../../../../../../scripts/api';
import { sendToIncoming, clearAppearedSelect } from '../../../actions';
import { toast } from 'react-toastify';
class AppearedToolbar extends Component {

    sendIdsToIncoming = () => {
        post('messagefilter', 'sendToIncoming',
            { ids: this.props.selectedAppearedIds },
            response => {
                this.props.dispatch(sendToIncoming(response));
                this.props.dispatch(clearAppearedSelect());
            },
            error => {
                toast(`Unable to send messages to incoming... ${error}`);
            }
        )
    }

    render() {

        const { selectedAppearedIds } = this.props;

        return (
            <div className="card-footer">
                <ButtonToolbar>
                    <button className={"btn btn-primary " + (selectedAppearedIds.length < 1 ? "disabled" : "")}
                        onClick={() => this.sendIdsToIncoming()}>
                        <i className="fa fa-recycle"></i> Back to Incoming
                    </button>
                </ButtonToolbar>
            </div>
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