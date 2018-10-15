import React, { Component } from 'react';
import { Panel, Button, ButtonToolbar, InputGroup, FormGroup } from 'react-bootstrap';
import FullScreenButton from '../FullScreenButton';
import PanelMessage from '../PanelMessage';

class IncomingPanel extends Component {

    state = {
        showMoreIncoming: false,
        selectedMessageIds: []
    }

    // @TODO Manage messages with redux instead of state

    incomingPanelShowMore = () => {
        this.setState({showMoreIncoming: !this.state.showMoreIncoming});
    }

    selectMessage = message => {
        let alreadyExistsInList = this.state.selectedMessageIds.find(id => {
            return id === message.id;
        })
        if(!alreadyExistsInList) {
            this.setState({selectedMessageIds: [
                    ...this.state.selectedMessageIds,
                    message.id
                ]})
        } else {
            let newSelectedIds = [];
            this.state.selectedMessageIds.forEach(id => {
                id !== message.id && newSelectedIds.push(id);
            })
            this.setState({selectedMessageIds: newSelectedIds})
        }
    }

    isMessageSelected = messageId => {
        return this.state.selectedMessageIds.find(id => {
            return messageId === id;
        })
    }

    render() {

        const { messages } = this.props;
        const { showMoreIncoming, selectedMessageIds } = this.state;

        console.log(selectedMessageIds);

        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <h3>
                        <i className="filter-help fa fa-info-circle"></i> Incoming Messages 
                        <FullScreenButton />
                    </h3>
                </Panel.Heading>
                <Panel.Footer>
                    <ButtonToolbar>
                        <Button  disabled={selectedMessageIds.length < 1} bsStyle="success">Send to Screen</Button>
                        <Button disabled={selectedMessageIds.length < 1} bsStyle="primary">Send to Queue</Button>
                        <Button bsStyle="default">Add Message</Button>
                        <Button bsStyle="default"><i className="fa fa-trash"></i></Button>
                        <Button onClick={() => this.incomingPanelShowMore()} className="pull-right">More <i className="fa fa-chevron-down"></i></Button>
                    </ButtonToolbar>
                    {showMoreIncoming && 
                    <ButtonToolbar className="more-toolbar">
                        <InputGroup>
                            <span className="input-group-addon">Add to Group </span>
                            <FormGroup>
                                <select className="form-control">
                                    <option value="select">None</option>
                                    <option value="other">...</option>
                                </select>
                            </FormGroup>
                            <span className="input-group-addon btn-success">Add </span>
                        </InputGroup>
                        <Button bsStyle="default">My Groups</Button>
                        <Button bsStyle="default">Send to...</Button>
                    </ButtonToolbar>}
                </Panel.Footer>

                <Panel.Body className="messages-body">
                    <ul className="list-group">
                    {messages && messages.map((message, index) => {
                        return <PanelMessage selected={this.isMessageSelected(message.id)} onSelect={() => this.selectMessage(message)} key={index} count={index + 1} message={message} />
                    })}
                    </ul>
                </Panel.Body>
            </Panel>
        );
    }
}

export default IncomingPanel;