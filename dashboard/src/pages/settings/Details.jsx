import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../actions/api';

class Settings extends React.Component {

    
    componentDidMount() {
        let apiController = 'settings';
        let apiFunction = 'getUserSettings';
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
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