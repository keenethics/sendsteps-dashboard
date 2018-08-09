import React from "react";
import View from "../base/View";
import PhonenumbersTableView from './TableView';

class Phonenumbers extends View {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    }
    
    componentDidMount() { 
        let apiController = 'phonenumbers';
        let apiFunction = 'getOverview';
        
        this.fetchResult(apiController, apiFunction)
        this.apiRefresh = setInterval(this.fetchResult, 1000, apiController, apiFunction)

    }
    componentWillUnmount() { 
        clearInterval(this.apiRefresh)
    }
    
    render() {
        const { error, isLoaded, items } = this.state;

        if(items.content) {
            console.log(JSON.parse(items.content));
        }
        if (error) {
            //Error
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            //Loading
            return (
                <div className="row">  
                    <div className="col-md-7">
                        <div className="lander">
                            <div className="view">
                                Loading...
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            //Success
            return (
                <div>
                    <div className="panel panel-default header-panel">  
                        <div className="panel-body">
                            <h1>Phonenumber Overview</h1>   
                        </div>
                    </div>
                    {this.getBreadCrumbs()}  
                    <div className="panel panel-default">  
                        <div className="panel-body">
                            <div className="container-fluid">
                                    {items.content ? 
                                        <PhonenumbersTableView data={JSON.parse(items.content)} />
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
} export default (Phonenumbers);