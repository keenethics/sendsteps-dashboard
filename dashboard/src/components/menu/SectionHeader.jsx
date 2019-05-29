import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SectionHeader.scss';

class SectionHeader extends Component {

    render() {
        return (
            <div className={"section-header"}>
                {this.props.menuOpened ? <p>{this.props.headerText}</p> : null}
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
) (SectionHeader);