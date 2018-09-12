import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';

class Settings extends React.Component {

    
    componentDidMount() {
        let apiController = 'responsesite';
        let apiFunction = 'getSiteList';
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        
        // //Get site with ID 73
        // let apiController = 'responsesite';
        // let apiFunction = 'getSiteById';
        // let apiParams = JSON.stringify({
        //     id: 73
        // });
        this.props.dispatch(fetchResult(apiController, apiFunction, apiParams));
    }
    
    render() {

        // const { items } = this.props;

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