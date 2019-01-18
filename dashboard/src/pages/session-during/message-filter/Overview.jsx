import React from 'react';
import { connect } from 'react-redux';
import { Panel, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
import ButtonSwitch from '../../../components/common/ButtonSwitch';
import './Overview.scss';
import QueuePanel from './extra-components/panels/QueuePanel';
import OnscreenPanel from './extra-components/panels/OnscreenPanel';
import IncomingPanel from './extra-components/panels/IncomingPanel';
import AppearedPanel from './extra-components/panels/AppearedPanel';
import { setMessageFilterData, setMessageGroupData, toggleAutoAccept, toggleUpvoting } from './actions';
import { post, get } from '../../../scripts/api';
import { toast } from 'react-toastify';

class MessageFilterOverview extends React.Component {

    componentDidMount() {
        post(
            'messagefilter', 
            'getMessageFilterData', 
            JSON.stringify({
                // Static messageround ID (Change this)
                msgRoundId: 364
            }),
            messages => {
                console.log(messages)
                this.props.dispatch(setMessageFilterData(messages.content))
            },
            error => console.log(error)
        )

        post(
            'messagefilter', 
            'getMessageGroups', 
            JSON.stringify({
                userId: this.props.currentUser.userId
            }), 
            groupData => {
                console.log(groupData)
                this.props.dispatch(setMessageGroupData(groupData.content))
            },
            error => console.log(error)
        )
    }

    toggleAutoAccept = value => {
        post(
            'messagefilter', 'toggleAutoAccept',
            JSON.stringify({isEnabled: value}),
            () => {
                this.props.dispatch(toggleAutoAccept(value))
                if(value) {
                    this.props.dispatch(toggleUpvoting(false))
                }
            },
            error => {
                console.log(error)
                toast(`Unable to toggle Auto accept... [${JSON.stringify(error)}]`);
            }
        )
    }
    
    toggleUpvoting = value => {
        post(
            'messagefilter', 'toggleUpvoting',
            JSON.stringify({isEnabled: value}),
            () => {
                this.props.dispatch(toggleUpvoting(value))
                if(value) {
                    this.props.dispatch(toggleAutoAccept(false))
                }
            },
            error => {
                console.log(error)
                toast(`Unable to toggle Upvoting... [${JSON.stringify(error)}]`);
            }
        )
    }
    /*
        Functionality & Requests (Backend)

        - Initial Fetch
        Fetch a list of messageRounds. if one of the messagerounds is active on the presentation, request livemessageroundmessages 
        based on the messageRoundId.

        Fetch session settings (hasUpvoting, autoApprove)

        Fetch groups (livemessageroundmessagegroups)

        e.g.: 
        
        content: {
            messageRounds: {
                ...messageRounds
            },
            currentMessageroundMessages: {
                ...messages
            },
            messageGroups: {
                ...messageGroups
            },
            currentSessionSettings: {
                ...sessionSettings
            }
        }

        - Selecting a slide/question(/messageRound)
        Should return a set of messages associated to a messageRoundId (getMessagesByMessageroundId)

        - Toggle upvoting 
        Should set the hasUpvoting value for a specific session Id to true/false
        if true, toggle auto accept (autoApprove) off

        - Toggle auto accept
        Should set the autoApprove value for a specific session Id to true/false (1/-1 in db?)
        if true, toggle upvoting (hasUpvoting) off

        - Add message
        Should generate a new message based on passed text. 
        A message generally looks like this:
        {
            id: someId                      (auto increment ID from adding to DB)
            connection: null,               (not sure what this is supposed to be)
            destination: "-",               (not sure what this is supposed to be)
            groupId: null,          
            messageRoundId: someMessageRoundId,
            participantId: currentParticipantId,
            sessionId: currentSessionId,
            source: "",                     (not sure what this is supposed to be)
            starred: null,          
            upvoteCount: messageUpvoteCount
            status: "unread",               (enum [read, shown, unread, showing, edited, removed, copied] with unread as initial)
            text: passedText
        }

        - Delete message(s)
        Softdelete message, pass list of message id's and change status to removed.

        - Undo delete messages
        Undelete messages (I keep a list of deleted Id's saved on the client side).
        This will require some backend validation such as checking if the messages belong to the
        sessionid/messageround etc.

        - Add group
        Adding a new group color (livemessageroundmessagegroups)
        Passing group name and group color. Should link to current logged in userId.
        Returns list of groups along with newly created group

        - Remove group
        Removes group (livemessageroundmessagegroups) based on id & userId

        - Add messages to group
        Should change status of a passed list of message Id's and changing their groupId to passed groupId

        - Send to [Queue, LiveScreen, Incoming, Appeared]
        Should change the status of messages (livemessageroundmessages) based on passed messageId's 
            - Queue (read)
            - LiveScreen (showing)
            - Incoming (unread)
            - Appeared (shown)
        

        - Send to Button
        Sends a message (livemessageroundmessages) to a different messageround on the current presentation
        *Not implemented yet clientside

        - Auto accept timers & Stuff
        Haven't looked at this yet. 
    */

    render() {

        const { upvotingEnabled, autoAcceptEnabled, sessionData } = this.props;

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
                                        <ButtonSwitch onChange={this.toggleUpvoting} selected={upvotingEnabled ? "1" : "0"} />    
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="control-label">Auto Accept messages</label>
                                        <ButtonSwitch onChange={this.toggleAutoAccept} selected={autoAcceptEnabled ? "1" : "0"} />
                                    </div>
                                </div>      
                            </div>
                        </Panel.Body>
                    </Panel>
                    
                    <div className="row">
                        <div className="col-md-8">
                            <IncomingPanel />
                        </div>

                        <div className="col-md-4">
                            <OnscreenPanel />
                            <QueuePanel />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <AppearedPanel />
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
            messages: state.messageFilterReducer.messages,
            currentUser: state.authReducer.currentUser,
            autoAcceptEnabled: state.messageFilterReducer.autoAcceptEnabled,
            upvotingEnabled: state.messageFilterReducer.upvotingEnabled,
            sessionData: state.sessionOverviewReducer.sessionData,
        }
    }
)(MessageFilterOverview);