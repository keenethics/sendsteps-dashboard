import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';

class Settings extends React.Component {

    
    componentWillMount() {
        let apiController = 'responsesite';
        let apiFunction = 'getSettingsBasic';
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult(apiController, apiFunction, apiParams));
    }
    
    render() {

        const { data, match } = this.props;
        console.log(data)

        return (
            <div className="row">  
                <div className="col-md-12">
                    <div className="lander">
                        <div>
                            {}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
        }
    }
)(Settings);