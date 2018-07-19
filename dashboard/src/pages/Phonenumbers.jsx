import React from "react";
import View from "./base/View";
import PhonenumberTableView from './PhonenumberTableView';

class Phonenumbers extends View {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    }
    fetchResult = (controller = '', functionName = '') => {
        fetch(this.api_url,{
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'controller='+controller+'&function='+functionName
        })
        .then(res => 
            res.json()
        )
        .then(
            (result) => {
                this.setState({
                isLoaded: true,
                items: result
                });
            },
            // Note: It is important to handle errors
            // instead of a catch() block so that we don't swallow exceptions from actual bugs in components.
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
        )
    }
    
    componentDidMount() { 
        let apiController = 'phonenumbers';
        let apiFunction = 'getOverview';
        
        this.fetchResult(apiController, apiFunction)
        setInterval(this.fetchResult, 1000, apiController, apiFunction)
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
                <div className="view">
                    <div className="panel panel-default">  
                        <div className="panel-heading">
                            <h1><i className="fa fa-phone"></i> Phonenumber Overview</h1>      
                        </div>

                        <div className="panel-body">
                            <div className="container-fluid">
                                    {items.content ? 
                                        <PhonenumberTableView data={JSON.parse(items.content)} />
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
} export default (Phonenumbers);