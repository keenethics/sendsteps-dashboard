import React from "react";
import View from "../base/View";

export default class Settings extends View {
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
        let apiFunction = 'getHowItWorks';
        let apiParam = this.props.match.params.id;
        this.fetchResult(apiController, apiFunction, apiParam)
    }
    
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
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
          );
        }
    }
    
    
}