import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../actions/api';

class AboutAddin extends React.Component {

    componentWillMount() {
        let apiController = 'about';
        let apiFunction = 'getAddin';
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult(apiController, apiFunction, apiParams));
    }
    
    render() {
        const { data } = this.props;
        return (
            <div className="row">  
                <div className="col-md-12">
                    <div className="lander">
                        <div>
                            {data}
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
)(AboutAddin);