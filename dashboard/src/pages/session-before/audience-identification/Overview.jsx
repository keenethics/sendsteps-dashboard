import React from 'react';
import { connect } from 'react-redux';
import { setAudienceData } from './actions';
import { Panel } from 'react-bootstrap';
import ResponseSiteContainer from '../../base/ResponseSiteContainer';
import BottomSaveBar from '../../../components/common/BottomSaveBar';
import HeaderPanel from '../../../components/common/HeaderPanel';
import TooltipNotification from '../../../components/common/TooltipNotification';
import { toggleModal } from '../../../actions/app';
import DefaultModal from '../../../components/common/DefaultModal';
import { post } from '../../../scripts/api';
import Toggle from 'react-bootstrap-toggle';
import CreateQuestionContainer from './question/CreateQuestionContainer';

class AudienceOverview extends React.Component {

    state = {
        isAnonymous: "0"
    }

    componentDidMount() {
        this.getIdentificationType()
    }

    getIdentificationType() {
        post(
            'sessions', 
            'getIdentificationType',
            {},
            result => this.setState({ isAnonymous: result.anonymousSources }),
            error => console.log(error)
        )
    }

    setIdentificationType(isAnonymous) {
        post(
            'sessions', 
            'setIdentificationType',
            JSON.stringify({ isAnonymous }),
            () =>  this.getIdentificationType(),
            error => console.log(error)
        )
    }

    setNonAnonymousFromDialog = () => {
        this.props.dispatch(toggleModal(false));
        this.setIdentificationType("0");
    }

    toggleAnonymous = isAnonymous => {
        if(isAnonymous === "0") {
            this.props.dispatch(toggleModal(true));
        } else {
            this.setIdentificationType(isAnonymous)
        }
    }

    render() {
        const { isAnonymous } = this.state;

        return (
            <div>  
                <HeaderPanel 
                    title={"Audience Identification"}
                    content={<span>
                        <p>Be able to identify your audience by requesting attendee information upon starting a session.</p>
                        <p>As such you’ll be able to match responses with respondents. Alternatively, let attendees respond anonymous to ensure authentic feedback throughout your session.</p>
                    </span>}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <Panel>
                                <Panel.Body>
                                    <h3>How to identify your participants?</h3>
                                    <hr/>
                                    <label>How to Participate <TooltipNotification 
                                            title={"How to Participate"}
                                            tooltip={
                                                <span className="text-left">
                                                    <p>By default all responses received are anonymous. </p> 
                                                    <p>This allows you to receive the most authentic responses.</p>
                                                </span>}>
                                                <i className="fa fa-question-circle"></i>
                                            </TooltipNotification>
                                        </label>
                                    <div className="form-group">
                                        <Toggle
                                            style={{width:'155px', height: '32px'}}
                                            onClick={() => this.toggleAnonymous(isAnonymous === "1" ? "0" : "1")}
                                            on={<span style={{paddingLeft: '10px'}}><i className="fa fa-user-secret"></i> Anonymous</span>}
                                            off={<span className="text-center"><i className="fa fa-user"></i> Non Anonymous</span>}
                                            offstyle="default"
                                            active={isAnonymous === "1"}
                                        />
                                    </div>
                                    <hr/>
                                    {isAnonymous === "0" && <span>
                                        <CreateQuestionContainer />
                                    </span>}
                                </Panel.Body>
                            </Panel>
                        </div>
                        <ResponseSiteContainer colWidth={4} /* Pass selected url, if nothings selected, don't render response site */ />
                    </div>
                    <BottomSaveBar />
                    <DefaultModal 
                        title={"Are you sure?"}
                        content={<p>Your audience will be tracked individually during the session</p>}
                        onConfirm={this.setNonAnonymousFromDialog}    
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            audienceData: state.audienceReducer.audienceData,
            currentUser: state.authReducer.currentUser,
            modalOpen: state.appReducer.modalOpen
        }
    }
)(AudienceOverview);