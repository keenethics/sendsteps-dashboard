import React from 'react';
import { connect } from 'react-redux';
import { Panel, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
import ButtonSwitch from '../../../components/common/ButtonSwitch';
import './Overview.scss';
import QueuePanel from './extra-components/panels/QueuePanel';
import LivePanel from './extra-components/panels/LivePanel';
import IncomingPanel from './extra-components/panels/IncomingPanel';
import AppearedPanel from './extra-components/panels/AppearedPanel';

class MessageFilterOverview extends React.Component {

    state = {
        showMoreIncoming: false,
        messages: [
            {
                id: 4141,
                connection: null,
                destination: "-",
                groupId: null,
                messageRoundId: 5481,
                participantId: 534149,
                sessionId: 591,
                source: "56b51709fb203035011a1e69f7be1ffc71eb012c",
                starred: null,
                status: "unread",
                text: "This is the first message"
            },
            {
                id: 827234,
                connection: null,
                destination: "-",
                groupId: null,
                messageRoundId: 5481,
                participantId: 12341,
                sessionId: 591,
                source: "56b51709fb203035011a1e69f7be1ffc71eb012c",
                starred: null,
                status: "unread",
                text: "This is the second message"
            },
            {
                id: 67151,
                connection: null,
                destination: "-",
                groupId: null,
                messageRoundId: 5481,
                participantId: 535149,
                sessionId: 591,
                source: "56b51709fb203035011a1e69f7be1ffc71eb012c",
                starred: null,
                status: "unread",
                text: "This is the third message"
            },
        ]
    }
   
    /* States: 
        Always:     
                    Auto accept/upvoting switches, Dropdown for 'Slide Title question
        Inactive:   
                    No session/messageround active:
                    Button with See old presentation results
        Session Active:
                    No active OPEN ENDED questions? > "There are no open ended questions in the current active presentation"
                    Incoming messages, Messages live on screen, in Queue, appeared on screen


        Conditional:
            Auto accept messages on:
                Upvoting off
                Messages on live screen with timer
                Dropdown : 3, 5, 10, 20, custom => opens modal with input
            Upvoting on:
                Auto accept messages off
                Alert with explanation

    */
    sendMessageToIncomingScreen(messages) {

    }

    sendMessageToLiveScreen(messages) {

    }

    sendMessageToQueue(messages) {

    }

    sendMessageToTrash(messages) {

    }

    addMessage(newMessage) {

    }

    selectNewQuestionSlide(id) {

    }

    toggleAutoAccept(value) {

    }

    toggleUpvoting(value) {

    }

    incomingPanelFullScreen() {

    }

    livePanelFullScreen() {

    }

    queuePanelFullScreen() {

    }

    appearedFullScreen() {

    }

    setAutoAcceptTimer(value) {

    }

    incomingPanelShowMore = () => {
        this.setState({showMoreIncoming: !this.state.showMoreIncoming})
    }

    getMessageByProperty(property, value) {
        let listWithProperty = [];
        this.state.messages.forEach(message => {
            message[property] === value && listWithProperty.push(message);
        });
        return listWithProperty;
    }

    getIncomingMessages() {
        return this.getMessageByProperty('status', 'unread');
    }

    getQueueMessages() {
        return this.getMessageByProperty('status', 'read');
    }

    getLiveMessages() {
        return this.getMessageByProperty('status', 'showing');
    }

    getAppearedMessages() {
        return this.getMessageByProperty('status', 'shown');
    }


    render() {
        return (
            <div className="message-filter">
                <HeaderPanel 
                    title={"Message Filter"} 
                    content={
                        <span>
                            <p>The Message filter can be used to filter out unwanted messages during your presentation.</p>
                            <p> It can also be used to manage incoming messages and to decide which messages will be displayed on the screen.</p>
                        </span>}/>
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            <div className="row">
                                <div className="col-md-12">
                                    <FormGroup controlId="formControlsSelect">
                                        {/* Only Questions that have a type of OPEN ENDED */}
                                        <ControlLabel>Current Slide/Question</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select">
                                            <option value="select">Select</option>
                                            <option value="other">...</option>
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="control-label">Upvoting</label>
                                        <ButtonSwitch />    
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="control-label">Auto Accept messages</label>
                                        <ButtonSwitch />
                                    </div>
                                </div>      
                            </div>
                        </Panel.Body>
                    </Panel>
                    
                    <div className="row">
                        <div className="col-md-8">
                            <IncomingPanel messages={this.getIncomingMessages()} />
                        </div>

                        <div className="col-md-4">
                            <LivePanel messages={this.getLiveMessages()} />
                            <QueuePanel messages={this.getQueueMessages()} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <AppearedPanel messages={this.getAppearedMessages()} />
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
} 

export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
        }
    }
)(MessageFilterOverview);