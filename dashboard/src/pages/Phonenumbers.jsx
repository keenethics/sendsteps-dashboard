import React from "react";
import View from "./base/View";

export default class Phonenumbers extends View {
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
        .then(res => res.json())
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
        
        this.fetchResult('phonenumbers', 'test')
        setInterval(this.fetchResult, 1000, 'phonenumbers', 'test')
    }
    
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            //Error
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            //Loading
            return (
                <div className="row">  
                    <div className="col-md-5"></div>
                    <div className="col-md-7">
                        <div className="lander">
                            <div>
                                Loading...
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            //Success
            return (
                <div className="row">  
                    <div className="col-md-7">
                    </div>
                    <div className="col-md-5">
                        <div className="lander">
                            <div>
                                    {items.content}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}