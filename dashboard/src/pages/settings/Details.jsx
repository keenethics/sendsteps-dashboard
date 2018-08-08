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
        fetch("https://api.nasa.gov/planetary/apod?api_key=OY11bHgvmGamHkxoZLNMj5bxw45cqJYQQTVvxjLU")
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
    
    
//   render() {
//     return (
//       <div className="Settings">
//         <div className="lander">
//           <h1>Dashboard</h1>
//           <p>Welcome to thasdasdasde New Sendsteps Dashboard</p>
//         </div>
//       </div>
//     );
//   }
}