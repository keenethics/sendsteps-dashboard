import React from 'react';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';

class Settings extends React.Component {

    
    componentWillMount() {
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
        const { data, match } = this.props;
        console.log(data);
        
        return (
            <div className="row">  
                <div className="col-md-12">
                    <div className="lander">
                        <div>
                            <select>
                            {data && data.map(item => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        {item.domain}
                                    </option>
                                )
                            })} 
                            </select>
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