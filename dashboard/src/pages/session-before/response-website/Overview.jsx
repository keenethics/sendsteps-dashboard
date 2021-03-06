import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../../actions/app';
import ResponseSiteContainer from '../../base/ResponseSiteContainer';
import InputField from '../../../components/common/InputField';
import ButtonSwitch from '../../../components/common/ButtonSwitch';
import BottomSaveBar from '../../../components/common/BottomSaveBar';
import HeaderPanel from '../../../components/common/HeaderPanel';

class ResponseOverview extends React.Component {

    componentDidMount() {
    }

    handleOpen() {
        this.props.dispatch(toggleModal(true));
    }

    handleClose() {
        this.props.dispatch(toggleModal(false));
    }

    render() {

        return (
            <div>  
                <HeaderPanel 
                    title={"Response Website Tabs"}
                    content={<span>
                        <p>Here are some additional settings for your Response Website tabs. </p>
                        <p>Allow editing of answers, Twitter feed and sharing of results.</p>
                    </span>}
                />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h3>Allow your audience to respond</h3>
                                    <hr/>
                                    <p>By activating the <strong>Respond</strong> tab on the response website, your audience will be enabled to respond to both open- and multiple choice questions. </p>
                                    <p> The questions shown on the response website relate to the question slide that is active within your presentation.</p>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="col-form-label">Respond</label>
                                                <ButtonSwitch />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="col-form-label">Edit answers</label>
                                                <ButtonSwitch />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mt-3">
                                <div className="card-body">
                                    <h3>Allow your audience to share results</h3>
                                    <hr/>
                                    <p>By enabling the <strong>Results</strong> tab on the response website, your audience will be enabled to share vote results. </p>
                                    <p>Create a social buzz outside your event venue. Select your preferred channels of social media and formulate an accompanying text to be published with each share.</p>
                                    <hr/>
                                    <div className="form-group">
                                        <label className="col-form-label">Share Results</label>
                                        <ButtonSwitch />
                                    </div>

                                    <div className="form-group">
                                        <label className="col-form-label">E-mail</label>
                                        <ButtonSwitch />
                                    </div>
                    
                                    <div className="form-group">
                                        <label className="col-form-label">E-mail Text</label>
                                        <textarea 
                                            className="form-control" 
                                            defaultValue="Hi ! I would like to share the results of today's interactive presentation, they might be interesting for you! During the presentation we made use of Sendsteps; An exciting way of audience interaction via your own mobile device. You can find the results attached to this email. Best regards,"
                                            rows={4} 
                                            cols={50}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="card mt-3">
                                <div className="card-body">
                                    <h3>Provide your audience with a tweet feed </h3>
                                    <hr/>
                                    <p>By activating the <strong>Tweets</strong> tab on the response website, your audience will be enabled to follow tweets that carry session-related hashtags. </p>
                                    <p>Pre-define hashtags yourself to offer your audience a customized timeline within the response website that informs everyone with the latest on Twitter.</p>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="col-form-label">Show Tweets</label>
                                                <ButtonSwitch />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <InputField 
                                                placeholder={"#Sendsteps"}
                                                labelText={"Hashtag displayed"}
                                                leftFaIcon={"hashtag"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <ResponseSiteContainer />
                        </div>
                    </div>
                    <BottomSaveBar />
                </div>
            </div>
        );
    }
}

export default connect() (ResponseOverview);