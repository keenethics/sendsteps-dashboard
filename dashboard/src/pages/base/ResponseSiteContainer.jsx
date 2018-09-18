import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { fetchResult } from '../../actions/api';

class ResponseSiteContainer extends Component {
    
    componentWillMount() {
        // Get currentUser's session
        // const { currentUser } = this.props;
        // this.props.dispatch(fetchResult('SessionController', 'getSessionByUserId', currentUser.id))
    }

    render() {
        const responseAddress = '//Sendsteps.me/';  // addinSettings.websiteAddress
        const internetKeyword = 'Free11390';        // currentSession.internetKeyword

        const colWidth = this.props.colWidth || 4;
        
        return (
            <div className={"col-md-" + colWidth}>
            <div className="panel panel-default">
                <div className="panel-body">
                    <h3>Live: Your Response Website</h3>
                    <hr/>
                    <p>Have a look! This is how your response website currently looks.</p>
                    <iframe 
                        src={responseAddress + internetKeyword}
                        allowFullScreen="" 
                        width="100%" 
                        height="600" 
                        scrolling="yes"
                        frameBorder="no">
                    </iframe>
                </div>
            </div>
        </div>
        )
    }
}

export default connect()(ResponseSiteContainer);