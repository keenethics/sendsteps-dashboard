import React from "react";
import { fetchResult } from '../../actions/api';
import { connect } from 'react-redux';
class Settings extends React.Component {
    
    componentWillMount() {
        let phonenumberId = this.props.match.params.id;
        console.log(phonenumberId);
        let apiController = 'about';
        let apiFunction = 'getDashboard';
        let apiParam = this.props.match.params.id;
        this.props.dispatch(fetchResult(apiController, apiFunction, apiParam));
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