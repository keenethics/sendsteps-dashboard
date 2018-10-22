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

class MessageFilterOverview extends React.Component {

    state = {
        showMoreIncoming: false,
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

    selectNewQuestionSlide(id) {

    }

    toggleAutoAccept(value) {

    }

    toggleUpvoting(value) {

    }

    incomingPanelFullScreen() {

    }

    OnscreenPanelFullScreen() {

    }

    queuePanelFullScreen() {

    }

    appearedFullScreen() {

    }

    setAutoAcceptTimer(value) {

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
            data: state.apiReducer.data,
        }
    }
)(MessageFilterOverview);