import React from 'react';
import { Panel } from 'react-bootstrap';
import ColorInfo from '../../components/common/ColorInfo';
import BreadCrumbs from '../../pages/base/BreadCrumbs';

const HeaderPanel = props => {

    const { title, content, match } = props;

    return (
        <span>
            <Panel>
                <Panel.Body>
                    <h1>{title}</h1>  
                    <hr/>
                    {content}
                </Panel.Body>
            </Panel>
            {match && <BreadCrumbs urlList={match.url} />}
        </span>
    )
}

export default HeaderPanel;