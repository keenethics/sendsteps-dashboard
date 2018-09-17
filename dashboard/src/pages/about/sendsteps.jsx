import React from "react";
import BreadCrumbs from "../base/BreadCrumbs";
import { QAPanel, BlogPanel } from './extra_components/InfoPanels';

class AboutSendsteps extends React.Component {
    
    render() {
        return (
            <div>
                <div className="panel panel-default">  
                    <div className="panel-body">
                        <h1>Sendsteps</h1>   
                    </div>
                </div>
                <BreadCrumbs urlList={this.props.match.url} />  
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <h2>
                                        What we believe
                                    </h2>
                                    <p>
                                        At Sendsteps we believe that everybody should be able to speak up during presentations. 
                                        Presentations require a complete make-over, turning them from strictly one-way communication into lively dialogues. 
                                        As such presentations provide people a better understanding of what is being said. 
                                        Levels of engagement with Sendsteps audience response system will sky rocket transforming meetings and providing a massive return on investments. 
                                        We have seen this happen over and over again. 
                                    </p>
                                    {/* @TODO Find out where to put files such as images, also add one here */}
                                    <p>
                                        Do you want to know who is behind the Sendsteps technology? 
                                        Visit our team webpage and get to know our brilliant minds! 
                                        We wish you a lot of interactive and inspiring sessions.
                                    </p>
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