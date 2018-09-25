import React from 'react';

export const Panel = props => {
    return (
        <Panel>
            {props.children}
        </div>
    )
}

export const PanelBody = props => {
    return (
        <Panel>
            <Panel.Body>
                {props.children}
            </div>
        </Panel>    
    )
}

export const PanelHeading = props => {
    return (
        <Panel>
            <Panel.Heading>
                <h2 className="panel-title">
                    {props.children}
                </h2>
            </div>
        </Panel>   
    )
}