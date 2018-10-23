import React from 'react';
import './SendstepsLogo.scss';

export default class SendstepsLogo extends React.Component {
    render() {
        return (
            <div className="sst-logo">
                <img height={55} width={400} src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="Sendsteps" />
            </div>
        )
    }
}