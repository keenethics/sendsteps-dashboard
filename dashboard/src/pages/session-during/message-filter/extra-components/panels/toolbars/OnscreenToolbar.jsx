import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { sendToAppeared, clearOnscreenSelect } from '../../../actions';
import { post } from '../../../../../../scripts/api';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
class OnscreenToolbar extends Component {

    sendIdsToAppeared = () => {
        post('messagefilter', 'sendToAppeared',
            { ids: this.props.selectedOnscreenIds },
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
            <div className="card-footer">
                <button className="btn btn-outline-danger pull-right" onClick={() => this.sendIdsToAppeared()} disabled={selectedOnscreenIds.length < 1} >
                    <i className="fa fa-trash"></i>
                </button>
            </div>
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