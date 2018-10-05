import React from 'react';
import { Link } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

const BottomSaveBar = props => {

    const { prevPage, onSave } = props;
    
    return (
        <Panel>
            <Panel.Body>
                <div className="row">
                    <div className="col-sm-12">
                        <button 
                            type='button' 
                            id='save-btn' 
                            onClick={onSave || function(){ console.log("onSave")}}
                            className='btn btn-success pull-right'>
                            <i className="fa fa-save"></i> Save
                        </button>
                        <Link to={prevPage || "/"}>
                            <button 
                                type='button' 
                                id='back-btn' 
                                className='btn btn-default'>
                                <i className="fa fa-chevron-left"></i> Back
                            </button>
                        </Link>
                    </div>
                </div>
            </Panel.Body>
        </Panel>            
    )
}

export default BottomSaveBar;