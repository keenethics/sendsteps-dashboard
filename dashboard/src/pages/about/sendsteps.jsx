import React from "react";
import BreadCrumbs from "../base/BreadCrumbs";
import { QAPanel, BlogPanel } from './extra_components/InfoPanels';
import { Panel } from 'react-bootstrap';

class AboutSendsteps extends React.Component {
    
    render() {
        return (
            <div>
                <Panel><Panel.Body>
                    <h1>Sendsteps</h1>   
                </Panel.Body></Panel>
                <BreadCrumbs urlList={this.props.match.url} />  
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <Panel><Panel.Body>
                                <div className="col-md-6 text-center img-container">
                                    <img src={process.env.PUBLIC_URL + "/assets/images/sst_dashboard_team.jpg"} />
                                </div>
                                <div className="col-md-6">
                                    <h2 className="text-center">What we believe</h2>
                                    <p>
                                        At Sendsteps we believe that everybody should be able to speak up during presentations.
                                        Presentations require a complete make-over, turning them from strictly one-way communication into lively dialogues.</p>
                                    <p>
                                        As such presentations provide people a better understanding of what is being said. 
                                        Levels of engagement with Sendsteps audience response system will sky rocket transforming meetings and providing a massive return on investments. </p>
                                    <p>
                                        We have seen this happen over and over again. 
                                    </p>
                                    <p>
                                        Do you want to know who is behind the Sendsteps technology? 
                                        Visit our team webpage and get to know our brilliant minds! 
                                        We wish you a lot of interactive and inspiring sessions.
                                    </p>
                                </div>
                                
                            </Panel.Body></Panel>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <BlogPanel />
                        <QAPanel />
                    </div>
                </div>
            </div>
        )
    }
} 
export default AboutSendsteps;