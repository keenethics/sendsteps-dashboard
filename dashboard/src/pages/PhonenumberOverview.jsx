import React from "react";
import View from "./base/View";
import { connect } from 'react-redux';

class PhonenumberOverview extends View {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    }
    
    render() {
        console.log(this.props.selectedPhonenumber);

        return (
            <div className="row">  
                <div className="col-md-7">
                    <div className="lander">
                        <div className="view">
                            Loaded!
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} export default connect(
    (state) => {
        return {
            selectedPhonenumber: state.dataReducer.selectedPhonenumber,
        }
    }
)(PhonenumberOverview);