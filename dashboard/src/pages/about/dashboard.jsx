import React from "react";
import { QAPanel, BlogPanel } from './extra_components/InfoPanels';
import BreadCrumbs from "../base/BreadCrumbs";
import { Panel } from 'react-bootstrap';
import HeaderPanel from "../../components/common/HeaderPanel";

class AboutDashboard extends React.Component {

    render() {
        return (
            <div>
                <HeaderPanel 
                    title={"The Dashboard"}                
                />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <Panel><Panel.Body>
                                <h2>An Introduction to Your Dashboard</h2>
                                <p>
                                    The Dashboard allows you to setup your interactive session, 
                                    to monitor live responses and to access results right after your session. 
                                    Read the instructions below and explore all the different functionalities the Sendsteps dashboard has to offer you!
                                </p>
                            </Panel.Body></Panel>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-8">
                            <Panel><Panel.Body>
                                {/* @TODO Before your session? */}
                                {/* @TODO Add images on the left (or right) hand of the explanation */}
                                <h3>During your Session</h3>
                                <hr/>
                                <p>Get direct access to audience responses throughout your interactive session.</p>
                                <hr/>
                                <p><i>Individual Responses</i></p>
                                <p>See who responded what during your interactive session.</p>
                                <hr/>
                                <p><i>Moderator</i></p>
                                <p>Follow all incoming messages and assign your selection to the session screen.</p>
                            </Panel.Body></Panel>
                            <Panel><Panel.Body>
                                <h3>After your Session</h3>
                                <hr/>
                                <p>Enjoy an easy access of your results at all times.</p>
                                <hr/>
                                <p><i>Presentation Results</i></p>
                                <p>Look back on results from previous interactive sessions.</p>
                                <hr/>
                                <p><i>Survey Results</i></p>
                                <p>Look back on survey results from previous interactive sessions.</p>
                            </Panel.Body></Panel>
                            <Panel><Panel.Body>
                                <h3>Your Profile</h3>
                                <hr/>
                                <p>
                                    Keep your profile information up-to-date to ensure smooth communications. 
                                    The License & User Info gives you an overview of the conditions that are applicable on the type of license that is used by your organization. 
                                    Only administrators are entitled to change these settings.
                                </p>
                            </Panel.Body></Panel>
                        </div>
                        <BlogPanel />
                        <QAPanel />
                    </div>
                </div>
            </div>
        );
    }
} 

export default AboutDashboard;