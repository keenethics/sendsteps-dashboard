import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../actions/apiActions';

class Settings extends React.Component {

    componentWillMount() {
        let phonenumberId = this.props.match.params.id;
        console.log(phonenumberId);
        let apiController = 'about';
        let apiFunction = 'getHowItWorks';
        let apiParam = this.props.match.params.id;
        this.props.dispatch(fetchResult(apiController, apiFunction, apiParam));
    }
    
    render() {

        const { data } = this.props;

        console.log(data);

        return (
            <div className="row">  
                <div className="col-md-12">
                    <div className="lander">
                        <div>
                            How it works
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
            data: state.apiReducer.data
        }
    }
) (Settings)