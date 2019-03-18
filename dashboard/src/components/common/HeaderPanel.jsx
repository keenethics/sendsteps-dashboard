import React from 'react';
import BreadCrumbs from '../../pages/base/BreadCrumbs';

const HeaderPanel = props => {

    const { title, content } = props;

    return (
        <span>
            <div className="card mt-3">
                <div className="card-body">
                    <h1>{title}</h1>  
                    {content &&
                    <span>
                        <hr/>
                        {content}
                    </span>}
                </div>
            </div>
            <BreadCrumbs />
        </span>
    )
}

export default HeaderPanel;