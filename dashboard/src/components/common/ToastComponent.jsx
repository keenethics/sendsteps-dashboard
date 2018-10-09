import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.min.css';

class ToastComponent extends React.Component {
    render() {
        return (
            <ToastContainer
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={true}
                toastClassName={'toast-default'}
                position={'top-right'}
            />
        )
    }
}

export default connect() (ToastComponent);