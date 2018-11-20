import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';
import { connect } from 'react-redux';
import { toggleSelectAppeared } from '../../actions';
import AppearedToolbar from './toolbars/AppearedToolbar';
import { isMessageSelected, getAppearedMessages } from '../../../../../scripts/messageHelper';

class AppearedPanel extends Component {

    toggleSelect = message => {
        this.props.dispatch(toggleSelectAppeared(message.id));
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
                <AppearedToolbar />
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