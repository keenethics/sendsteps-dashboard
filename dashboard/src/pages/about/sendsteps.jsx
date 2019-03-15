import React from "react";
import { QAPanel, BlogPanel } from './extra_components/InfoPanels';
import HeaderPanel from "../../components/common/HeaderPanel";
import TeamImage from '../../assets/images/sst_dashboard_team.jpg';

class AboutSendsteps extends React.Component {
    
    render() {
        return (
            <div>
                <HeaderPanel title={"Sendsteps"} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                  
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
                                    <div className="col-md-6 mt-4 text-center img-container">
                                        <img alt="Sendsteps Team" src={TeamImage} />
                                    </div>
                                    </div>
                                </div>
                            </div>
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