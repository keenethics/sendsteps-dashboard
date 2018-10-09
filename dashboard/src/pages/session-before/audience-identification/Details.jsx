import React from 'react';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { Panel } from 'react-bootstrap';
import ResponseSiteContainer from '../../base/ResponseSiteContainer';
import ButtonSwitch from '../../../components/common/ButtonSwitch';
import BottomSaveBar from '../../../components/common/BottomSaveBar';
import HeaderPanel from '../../../components/common/HeaderPanel';
import TooltipNotification from '../../../components/common/TooltipNotification';
import { toggleModal } from '../../../actions/app';
import DefaultModal from '../../../components/common/DefaultModal';

class Details extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isAnonymous: false
        }
    }

    componentDidMount() {
        let apiController = 'responsesite';
        let apiFunction = 'getSiteList';
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult(apiController, apiFunction, apiParams));
    }

    toggleAnonymous(value) {
        if(value.indexOf("Non") !== -1) {
            this.props.dispatch(toggleModal(true));
        }
    }

    setAnonymous(value) {
        this.setState({isAnonymous: value});
        this.props.dispatch(toggleModal(false));
    }
    
    render() {
        const { data, additionalData, currentUser, modalOpen } = this.props;
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
                        <div className="col-md-6">
                            <Panel>
                                <Panel.Body>
                                    <h3>How to identify your participants?</h3>
                                    <hr/>
                                    <div className="form-group">
                                        <label>How to Participate <TooltipNotification 
                                            title={"How to Participate"}
                                            content={<span className="text-left">
                                                <p>By default all responses received are anonymous. </p> 
                                                <p>This allows you to receive the most authentic responses.</p>
                                            </span>}/>
                                        </label>
                                        <ButtonSwitch onChange={this.toggleAnonymous.bind(this)} options={["Anonymous", "Non Anonymous"]} />
                                        <hr/>
                                        {!isAnonymous && <span>
                                            {/* <IdentificationDetails /> */}
                                        </span>}
                                    </div>
                                </Panel.Body>
                            </Panel>
                        </div>
                        <ResponseSiteContainer colWidth={6} /* Pass selected url, if nothings selected, don't render response site */ />
                    </div>
                    <BottomSaveBar />

                    {modalOpen && <DefaultModal 
                        title={"Are you sure?"}
                        content={<p>Your audience will be tracked individually during the session</p>}
                        onConfirm={() => this.setAnonymous(true)}    
                    />}
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
            additionalData: state.apiReducer.additionalData,
            currentUser: state.authReducer.currentUser,
            modalOpen: state.appReducer.modalOpen
        }
    }
)(Details);