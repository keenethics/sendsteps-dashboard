import React, { Component } from "react";
import "./Style.css";

export default class Phonenumbers extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    }
    
    componentDidMount() {
        fetch("http://local-nova.sendsteps.com/index.php")
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                isLoaded: true,
                items: result
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
        )
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
                                    {items}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}