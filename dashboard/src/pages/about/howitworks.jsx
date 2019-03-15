import React from "react";
import { AddinInfoPanel, TutorialInfoPanel } from './extra_components/InfoPanels';
import HeaderPanel from "../../components/common/HeaderPanel";
class AboutAddin extends React.Component {

    render() {
        // @TODO, generate images of the videos to prevent long loading.
        // When the video is clicked, open a modal with the relevant Iframe, and play the video (autoplay)
        // This will increase performance (on this page) drastically

        return (
            <div>
                <HeaderPanel title={"How it works"} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h2>Video Tutorial</h2>
                                    <p>Watch the video tutorial to get you started with the PowerPoint Add-in!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <TutorialInfoPanel />
                        <AddinInfoPanel />
                    </div>
                </div>
            </div>
        );
    }
}
export default AboutAddin;