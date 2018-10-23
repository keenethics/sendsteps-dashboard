import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class BottomSaveBar extends Component  {

    goBack() {
        this.props.history.goBack();
    }
    render() {

        const { onSave } = this.props;

        return (
            <Panel>
                <Panel.Body>
                    <div className="row">
                        <div className="col-sm-12">
                            <button 
                                type='button' 
                                id='save-btn' 
                                onClick={onSave || function(){ console.log("onSave")}}
                                className='btn btn-success'>
                                <i className="fa fa-save"></i> Save
                            </button>
                                <button 
                                    onClick={() => this.goBack()}
                                    type='button' 
                                    id='back-btn' 
                                    className='btn btn-default pull-right'>
                                    <i className="fa fa-chevron-left"></i> Back
                                </button>
                        </div>
                    </div>
                </Panel.Body>
            </Panel>            
        )
    }
}

export default withRouter(BottomSaveBar)