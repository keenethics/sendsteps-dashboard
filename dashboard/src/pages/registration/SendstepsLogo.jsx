import * as React from 'react'; 
import './SendstepsLogo.scss';
import SstLogo from '../../assets/images/logo.png';

export default class SendstepsLogo extends React.Component {
    render() {
        return (
            <div className="sst-logo">
                <img height={55} width={400} src={SstLogo} alt="Sendsteps" />
            </div>
        )
    }
}