import React, { Component } from 'react';
import { connect } from 'react-redux';
class ResponseSiteContainer extends Component {
    
    componentWillMount() {
        // Get currentUser's session
        // const { currentUser } = this.props;
    }

    render() {
        const responseAddress = '//Sendsteps.me/';  // addinSettings.websiteAddress
        const internetKeyword = 'Free11390';        // currentSession.internetKeyword

        return (
            <div className="card"><div className="card-body">
                <h3>Live: Your Response Website</h3>
                <hr/>
                <p>Have a look! This is how your response website currently looks.</p>
                <iframe 
                    title="Response website"
                    src={this.props.url || responseAddress + internetKeyword}
                    allowFullScreen="" 
                    width="100%" 
                    height="600" 
                    scrolling="yes"
                    frameBorder="no">
                </iframe>
            </div></div>
        )
    }
}

export default connect()(ResponseSiteContainer);