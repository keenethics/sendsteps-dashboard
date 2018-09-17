import React from "react";
import BreadCrumbs from "../base/BreadCrumbs";
import { AddinDownloadPanel, AddinInfoPanel } from './extra_components/InfoPanels';

class AboutAddin extends React.Component {

    render() {
        const ytLinks = [
            {
                title: 'The Essentials',
                infoText: 'Learn how to get used to the Sendsteps tools and how to work with these.',
                links: [
                    'https://www.youtube.com/embed/ROFoTcIM444?feature=oembed',
                    'https://www.youtube.com/embed/ZfddYEMIFfE?feature=oembed',
                    'https://www.youtube.com/embed/cO5J2H6KWR4?feature=oembed',
                    'https://www.youtube.com/embed/OJnUZNEaCLk?feature=oembed'
                ]
            },
            {
                title: 'Extra Functionalities',
                infoText: 'Explore the various possibilities using the extra functionalities of the Sendsteps Addin and dashboard.',
                links: [
                    'https://www.youtube.com/embed/kUHO_PvypPw?feature=oembed',
                    'https://www.youtube.com/embed/0r_CYT_-Hck?feature=oembed',
                    'https://www.youtube.com/embed/S7snYPfnlgo?feature=oembed',
                    'https://www.youtube.com/embed/Cfl6dvLc8xA?feature=oembed'
                ]
            }
        ];

        // @TODO, generate images of the videos to prevent long loading.
        // When the video is clicked, open a modal with the relevant Iframe, and play the video (autoplay)
        // This will increase performance (on this page) drastically
        
        const content = ytLinks.map((section, index) => {
            return (
                <div key={index}><h3>{section.title}</h3>
                <p>{section.infoText}</p>
                {section.links.map((link, linkIndex) => {
                    return (
                        <div key={linkIndex} className="embed-responsive embed-responsive-16by9">
                            <iframe 
                            title={section.title}
                            src={link} 
                            frameBorder="0"
                            allowFullScreen>
                        </iframe>
                    </div>
                    )
                })}
                </div>
            )
        })

        return (
            <div>
                <div className="panel panel-default">  
                    <div className="panel-body">
                        <h1>How it works</h1>   
                    </div>
                </div>
                <BreadCrumbs urlList={this.props.match.url} />  
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <h2>
                                        Video Tutorial
                                    </h2>
                                    <p>
                                        Watch the video tutorial to get you started with the PowerPoint Add-in!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 youtube-container">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    {content}
                                </div>
                            </div>
                        </div>
                        <AddinInfoPanel />
                        <AddinDownloadPanel />
                    </div>
                </div>
            </div>
        );
    }
}
export default AboutAddin;