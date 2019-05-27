import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class BottomSaveBar extends Component  {

    goBack() {
        this.props.history.goBack();
    }
    render() {

        const { onSave, noSave, disabled, loading } = this.props;

        return (
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-12">
                            {!noSave &&
                            <div className={"btn btn-sm btn-success " + ((disabled || loading) ? "disabled": "")} 
                                onClick={onSave || function(){ console.log("onSave")}}
                            >
                                {!loading && <i className="fa fa-save"></i>}
                                {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Save
                            </div>}
                            <button 
                                onClick={() => this.goBack()}
                                type='button' 
                                id='back-btn' 
                                className='btn btn-sm btn-outline-secondary float-right'>
                                <i className="fa fa-chevron-left"></i> Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>            
        )
    }
}

export default withRouter(BottomSaveBar)