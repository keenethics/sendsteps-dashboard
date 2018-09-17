import React from 'react';

export const AddinInfoPanel = () => {
    return (
        <div className="col-md-4">
            <div className="panel panel-default">
                <div className="panel-body">
                    <h3>Branded Add-in</h3>
                    <strong>Your own look and feel!</strong>
                    <p>
                        Have all your add-in items branded in the corporate style of your organization: instruction-, 
                        question- and result slides, the response website and even the entire software package.
                    </p>
                    <button className="btn btn-default">
                        <i className="fa fa-info"></i> More information 
                    </button>
                </div>
            </div>
        </div>
    )
}

export const AddinDownloadPanel = () => {
    return (
        <div className="col-md-4">
            <div className="panel panel-default">
                <div className="panel-body">
                    <h3>Download Add-in</h3>
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
                </div>
            </div>
        </div>
    )
}

export const BlogPanel = () => {
    return (
        <div className="col-md-4">
            <div className="panel panel-default">
                <div className="panel-body">
                    <h3>Read our blog!</h3>
                    <button className="btn btn-primary"><i className="fa fa-rss"></i> Sendsteps Blog </button>
                </div>
            </div>
        </div>
    )
}

export const QAPanel = () => {
    return (
        <div className="col-md-4">
            <div className="panel panel-default">
                <div className="panel-body">
                    <h3>Got a question?</h3>
                    <p>Please contact your administrator below for any questions.</p>
                    <p><i className="fa fa-phone"></i> +31 (0)20 716 36 56</p>
                    <p><i className="fa fa-envelope"></i> Support@Sendsteps.com</p>
                </div>
            </div>
        </div>
    )
}