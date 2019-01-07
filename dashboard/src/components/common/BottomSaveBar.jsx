import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class BottomSaveBar extends Component  {

    goBack() {
        this.props.history.goBack();
    }
    render() {

        const { onSave, noSave, disabled } = this.props;

        return (
            <Panel>
                <Panel.Body>
                    <div className="row">
                        <div className="col-sm-12">
                            {!noSave &&
                            <Button 
                                disabled={disabled}
                                onClick={onSave || function(){ console.log("onSave")}}
                                bsStyle='success'>
                                <i className="fa fa-save"></i> Save
                            </Button>}
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