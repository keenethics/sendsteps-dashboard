import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../actions/apiActions';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    }
    
    componentDidMount() {
        let phonenumberId = this.props.match.params.id;
        console.log(phonenumberId);
        let apiController = 'about';
        let apiFunction = 'getSendsteps';
        let apiParam = this.props.match.params.id;
        this.props.dispatch(fetchResult(apiController, apiFunction, apiParam))
    }
    
    render() {

        const { items } = this.state;
        return (
            <div className="row">  
                <div className="col-md-12">
                    <div className="lander">
                        <div>
                            {items.date} <br/>
                            {items.explanation}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 

export default connect() (Settings)