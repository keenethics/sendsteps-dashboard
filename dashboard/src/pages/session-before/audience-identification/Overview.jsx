import * as React from 'react'; 
import { connect } from 'react-redux';
import ResponseSiteContainer from '../../base/ResponseSiteContainer';
import HeaderPanel from '../../../components/common/HeaderPanel';
import TooltipNotification from '../../../components/common/TooltipNotification';
import { toggleModal } from '../../../actions/app';
import DefaultModal from '../../../components/common/DefaultModal';
import { post } from '../../../scripts/api';
import IdentificationQuestionWrapper from './question/IdentificationQuestionWrapper';
import './Overview.scss'
import Switch from 'App/components/common/inputs/switch/Switch';

class AudienceOverview extends React.Component {

    state = {
        isAnonymous: true,
        sessionId: null,
    }

    componentDidMount() {
        this.getIdentificationType();
    }

    getIdentificationType() {
        const { currentUser } = this.props;
        const userId = currentUser && currentUser.userId;
        post(
            '',
            'identification/getIdentificationType',
            { id: userId },
            result => this.setState({ isAnonymous: result.anonymousSources, sessionId: result.id }),
            error => console.log(error)
        )
    }

    setIdentificationType(isAnonymous) {
        const { sessionId } = this.state;
        const { currentUser } = this.props;
        const userId = currentUser && currentUser.userId;
        post(
            '',
            'identification/setIdentificationType',
            { sessionId, userId, isAnonymous },
            () =>  this.getIdentificationType(),
            error => console.log(error)
        )
    }

    setNonAnonymousFromDialog = () => {

        this.props.dispatch(toggleModal(false));
        this.setIdentificationType(false);
    }

    toggleAnonymous = isAnonymous => {
        if(!isAnonymous) {
            this.props.dispatch(toggleModal(true));
        } else {
            this.setIdentificationType(isAnonymous)
        }
    }

    render() {
        const { isAnonymous, sessionId } = this.state;

        return (
            <div>  
                <HeaderPanel 
                    title={"Audience Identification"}
                    content={<span>
                        <p>Be able to identify your audience by requesting attendee information upon starting a session.</p>
                        <p>As such you’ll be able to match responses with respondents. Alternatively, let attendees respond anonymous to ensure authentic feedback throughout your session.</p>
                    </span>}/>
                <div className="container-fluid mb-3">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h3>How to identify your participants?</h3>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-sm-12 px-3">
                                            <label className="col-form-label col-form-label-sm mb-2">How to Participate <TooltipNotification 
                                                title={"How to Participate"}
                                                tooltip={
                                                    <span className="text-left">
                                                        <p>By default all responses received are anonymous. </p> 
                                                        <p>This allows you to receive the most authentic responses.</p>
                                                    </span>}>
                                                    <i className="fa fa-question-circle"></i>
                                                </TooltipNotification>
                                            </label>
                                            <br/>
                                            <Switch
                                                size="sm"
                                                style={{width: '150px'}}
                                                offstyle="secondary"
                                                onClick={() => this.toggleAnonymous(!isAnonymous)}
                                                on={<span style={{paddingLeft: '10px'}}><i className="fa fa-user-secret"></i> Anonymous</span>}
                                                off={<span className="text-center"><i className="fa fa-user"></i> Non Anonymous</span>}
                                                active={!!isAnonymous}
                                            />
                                        </div>
                                    </div>
                                    <hr className="mb-0"/>
                                    {!isAnonymous && <IdentificationQuestionWrapper sessionId={sessionId} />}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                        <ResponseSiteContainer  /* Pass selected url, if nothings selected, don't render response site */ />
                        </div>
                    </div>
                    <DefaultModal 
                        title={"Are you sure?"}
                        content={<p>Your audience will be tracked individually during the session</p>}
                        onConfirm={this.setNonAnonymousFromDialog}    
                        confirmText={<><i className="fa fa-check"></i> Got it!</>}
                        cancelText={<><i className="fa fa-times"></i> Cancel</>}
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