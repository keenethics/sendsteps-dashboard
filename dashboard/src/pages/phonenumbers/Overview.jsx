import React from 'react';
import View from "../base/View";
import TableView from './TableView';
import { connect } from 'react-redux';
import { fetchResult } from '../../actions/apiActions'

class PhonenumbersOverview extends React.Component {

    // constructor(props) {
    //     super(props);
    // }
    
    componentDidMount() {
        fetchResult('phonenumbers', 'getOverview');
        this.apiRefresh = setInterval(fetchResult, 5000, 'phonenumbers', 'getOverview');
    }

    componentWillUnmount() {
        clearInterval(this.apiRefresh);//If we use setInterval, we need this method to avoid memory leaks
    }
    render() {
        return (
            <View>
                <div>
                    <div className="panel panel-default header-panel">  
                        <div className="panel-body">
                            <h1>Phonenumber Overview</h1>   
                        </div>
                    </div>
                    {/* {this.getBreadCrumbs()}   */}
                    <div className="panel panel-default">  
                        <div className="panel-body">
                            <div className="container-fluid">
                                {this.props.data ? 
                                    <TableView data={this.props.data} />
                                : null}
                            </div>
                        </div>
                    </div>
                </div>
            </View>
        )
        // const { error, isLoaded, items } = this.state;

        // if(items.content) {
        //     console.log(JSON.parse(items.content));
        // }
        // if (error) {
        //     //Error
        //     return <div>Error: {error.message}</div>;
        // } else if (!isLoaded) {
        //     //Loading
        //     return (
        //         <div className="row">  
        //             <div className="col-md-7">
        //                 <div className="lander">
        //                     <div className="view">
        //                         Loading...
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     );
        // } else {
        //     //Success
        //     return (
                
        //     );
        // }
    }
} 

export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
        }
    }
)(PhonenumbersOverview);