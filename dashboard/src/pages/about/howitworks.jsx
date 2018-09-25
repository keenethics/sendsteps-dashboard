import React from "react";
import BreadCrumbs from "../base/BreadCrumbs";
import { AddinDownloadPanel, AddinInfoPanel, TutorialInfoPanel } from './extra_components/InfoPanels';
import ResponseSiteContainer from '../base/ResponseSiteContainer';
import { Panel } from 'react-bootstrap';
class AboutAddin extends React.Component {

    render() {
        

        // @TODO, generate images of the videos to prevent long loading.
        // When the video is clicked, open a modal with the relevant Iframe, and play the video (autoplay)
        // This will increase performance (on this page) drastically
        
        

        return (
            <div>
                <Panel><Panel.Body>
                    <h1>How it works</h1>   
                </Panel.Body></Panel>
                <BreadCrumbs urlList={this.props.match.url} />  
                {/* <PageHeaderPanel>
                
                </PageHeaderPanel> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <Panel><Panel.Body>
                                <h2>Video Tutorial</h2>
                                <p>Watch the video tutorial to get you started with the PowerPoint Add-in!</p>
                            </Panel.Body></Panel>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <TutorialInfoPanel />
                        <AddinInfoPanel />
                        <AddinDownloadPanel />
                        <ResponseSiteContainer />
                    </div>
                </div>
            </div>
        );
    }
}
export default AboutAddin;