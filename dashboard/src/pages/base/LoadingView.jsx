import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoadingView extends Component {
    render() {

        let marginLeft = this.props.menuOpened ? '125px' : '20px';
        
        return (
            <div>
                <div className="loading-container" >
                    <div className="loading-view" style={{marginLeft: marginLeft}}>
                        Loading data... <i className="fa fa-circle-notch fa-spin" style={{fontSize: '16px'}}></i>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            menuOpened: state.appReducer.menuOpened
        }
    }
) (LoadingView)