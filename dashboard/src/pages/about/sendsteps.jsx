import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../actions/api';

class AboutSendsteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    }
    
    componentDidMount() {
        let apiController = 'about';
        let apiFunction = 'getSendsteps';
        // let apiParams = JSON.stringify({
        //     id: this.props.match.params.id
        // });
        this.props.dispatch(fetchResult(apiController, apiFunction));
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
        )
    }
} 

export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
        }
    }
)(AboutSendsteps);