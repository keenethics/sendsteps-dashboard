import React from 'react';
import './ImageUploadField.scss';

export default class ImageUploadField extends React.Component {
    render() {

        const { colWidth, labelText } = this.props;

        return (
            <div className={"col-md-" + colWidth || 6}>
                <div className="picture-upload">
                    <div className="current-picture">
                        <div className="btn-circle btn-lg">
                            <h2>
                                <i className="fa fa-lg fa-camera"></i>
                            </h2>
                        </div>
                    
                    </div>
                    <div className="form-group">
                        <label className="col-form-label">{labelText || "No labelText selected"}</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-secondary" type="button"><i className="fa fa-images"></i> Browse...</button>
                            </div>
                            
                            <input value="" placeholder="(PNG, JPEG, BMP, GIF)" className="form-control" name='picture' />
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}