import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class BottomSaveBar extends Component  {

    goBack() {
        this.props.history.goBack();
    }
    render() {

        const { onSave, noSave, disabled } = this.props;

        return (
            <div className="card mt-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-12">
                            {!noSave &&
                            <div className="btn btn-success" 
                                disabled={disabled}
                                onClick={onSave || function(){ console.log("onSave")}}
                            >
                                <i className="fa fa-save"></i> Save
                            </div>}
                            <button 
                                onClick={() => this.goBack()}
                                type='button' 
                                id='back-btn' 
                                className='btn btn-outline-secondary float-right'>
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