import React from "react";
import { fetchResult } from '../../actions/api';
import { connect } from 'react-redux';
class Settings extends React.Component {
    
    componentWillMount() {
        let apiController = 'about';
        let apiFunction = 'getDashboard';
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult(apiController, apiFunction, apiParams));
    }
    
    render() {

        return (
            <div className="row">  
                <div className="col-md-12">
                    <div className="lander">
                        <div>
                            {/* {items.date} <br/>
                            {items.explanation} */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 

export default connect() (Settings);