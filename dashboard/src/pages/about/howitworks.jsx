import React from "react";
import BreadCrumbs from "../base/BreadCrumbs";
import { AddinDownloadPanel, AddinInfoPanel, TutorialInfoPanel } from './extra_components/InfoPanels';
import ResponseSiteContainer from '../base/ResponseSiteContainer';
import { PanelBody } from "../../components/common/Panels";
class AboutAddin extends React.Component {

    render() {
        

        // @TODO, generate images of the videos to prevent long loading.
        // When the video is clicked, open a modal with the relevant Iframe, and play the video (autoplay)
        // This will increase performance (on this page) drastically
        
        

        return (
            <div>
                <PanelBody>
                    <h1>How it works</h1>   
                </PanelBody>
                <BreadCrumbs urlList={this.props.match.url} />  
                {/* <PageHeaderPanel>
                
                </PageHeaderPanel> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <PanelBody>
                                <h2>Video Tutorial</h2>
                                <p>Watch the video tutorial to get you started with the PowerPoint Add-in!</p>
                            </PanelBody>
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