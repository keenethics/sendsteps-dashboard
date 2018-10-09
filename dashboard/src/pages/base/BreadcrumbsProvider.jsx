import React from 'react';
import { connect } from 'react-redux';
import { setBreadcrumbsUrl } from '../../actions/app';
import { withRouter } from "react-router-dom";

class BreadCrumbsProvider extends React.Component {

    componentDidMount() {
        this.props.dispatch(setBreadcrumbsUrl(this.props.location.pathname));
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(connect() (BreadCrumbsProvider));