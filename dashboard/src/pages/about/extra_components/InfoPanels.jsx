import React from 'react';
import { Panel } from 'react-bootstrap';
import './InfoPanels.scss';

export const AddinInfoPanel = () => {
    return (
        <div className="col-md-4">
            <Panel>
                <Panel.Body>
                    <h3>Branded Add-in</h3>
                    <hr/>
                    <strong>Your own look and feel!</strong>
                    <p>
                        Have all your add-in items branded in the corporate style of your organization: instruction-, 
                        question- and result slides, the response website and even the entire software package.
                    </p>
                    <button className="btn btn-default">
                        <i className="fa fa-info"></i> More information 
                    </button>
                </Panel.Body>
            </Panel>
        </div>
    )
}

export const AddinDownloadPanel = () => {
    return (
        <div className="col-md-4">
            <Panel><Panel.Body>
                <h3>Download Add-in</h3>
                <hr/>
                <p>Requirements to use the Sendsteps Add-In:</p>
                <ul>
                    <li>Windows 7 and above</li>
                    <li>Service pack 1 installed</li>
                    <li>Internet explorer 11</li>
                    <li>PowerPoint 2010 and above</li>
                    <li>A stable Internet connection</li>
                </ul>
                <button className="btn btn-default">
                    <i className="fa fa-download"></i> Download 
                </button>
            </Panel.Body></Panel>
        </div>
    )
}

export const BlogPanel = () => {
    return (
        <div className="col-md-6">
            <Panel>
                <Panel.Body>
                    <h3>Read our blog!</h3>
                    <hr/>
                    <a href="https://www.sendsteps.com/en/about/blog/" target="_blank">
                        <button className="btn btn-primary">
                            <i className="fa fa-rss"></i> Sendsteps Blog 
                        </button>
                    </a>
                </Panel.Body>
            </Panel>  
        </div>
    )
}

export const QAPanel = () => {
    return (
        <div className="col-md-6">
            <Panel>
                <Panel.Body>
                    <h3>Got a question?</h3>
                    <hr/>
                    <p>Please contact your administrator below for any questions.</p>
                    <p><i className="fa fa-phone"></i> +31 (0)20 716 36 56</p>
                    <p><i className="fa fa-envelope"></i> Support@Sendsteps.com</p>
                </Panel.Body>
            </Panel>
        </div>
    )
}

export const TutorialInfoPanel = () => {
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

    const content = ytLinks.map((section, index) => {
        return (
            <div key={index}><h3>{section.title}</h3>
            <hr/>
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
        <div className="col-md-8 youtube-container">
            <Panel>
                <Panel.Body>
                    {content}
                </Panel.Body>
            </Panel>
        </div>
    )
}