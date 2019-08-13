import * as React from 'react'; 
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import './ToastComponent.scss';

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