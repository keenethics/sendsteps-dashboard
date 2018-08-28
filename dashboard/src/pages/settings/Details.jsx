import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../actions/apiActions';

class Settings extends React.Component {

    
    componentDidMount() {
        // fetch("https://api.nasa.gov/planetary/apod?api_key=OY11bHgvmGamHkxoZLNMj5bxw45cqJYQQTVvxjLU")
        //     .then(res => res.json())
        //     .then(
        //     (result) => {
        //         this.setState({
        //         isLoaded: true,
        //         items: result
        //         });
        //     },
        //     // Note: it's important to handle errors here
        //     // instead of a catch() block so that we don't swallow
        //     // exceptions from actual bugs in components.
        //     (error) => {
        //         this.setState({
        //         isLoaded: true,
        //         error
        //         });
        //     }
        // )
    }
    
    render() {

        const { items } = this.props;

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