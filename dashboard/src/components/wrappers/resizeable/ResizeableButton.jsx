import React, { Component } from 'react';
import { connect } from 'react-redux';

class ResizeableButton extends Component {

    btnSizes = {
        sm: 'btn btn-sm ',
        md: 'btn btn ',
        lg: 'btn btn-lg '
    }

    getClassNameFromProps = props => {
        const { variant, appSize } = props;
        let className = '';
        className += !!appSize ? this.btnSizes[appSize] : ''
        className += !!variant ? variant : ''
        return !!className.length ? className : this.btnSizes.md;
    }

    render() {

        return (
            <div className={this.getClassNameFromProps(this.props)}  {...this.props} >
                {this.props.children}
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            appSize: state.appReducer.appSize
        }
    }
)(ResizeableButton);