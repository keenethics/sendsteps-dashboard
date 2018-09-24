import React from 'react';

export const Panel = props => {
    return (
        <div className="panel panel-default">
            {props.children}
        </div>
    )
}

export const PanelBody = props => {
    return (
        <Panel>
            <div className="panel-body">
                {props.children}
            </div>
        </Panel>    
    )
}

export const PanelHeading = props => {
    return (
        <Panel>
            <div className="panel-heading">
                <h2 className="panel-title">
                    {props.children}
                </h2>
            </div>
        </Panel>   
    )
}