import React from 'react';
import { Panel } from 'react-bootstrap';
import BreadCrumbs from '../../pages/base/BreadCrumbs';

const HeaderPanel = props => {

    const { title, content } = props;


    return (
        <span>
            <Panel>
                <Panel.Body>
                    <h1>{title}</h1>  
                    {content &&
                    <span>
                        <hr/>
                        {content}
                    </span>}
                </Panel.Body>
            </Panel>
            <BreadCrumbs />
        </span>
    )
}

export default HeaderPanel;