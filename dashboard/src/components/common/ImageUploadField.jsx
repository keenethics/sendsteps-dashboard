import React from 'react';
import './ImageUploadField.scss';

export default class ImageUploadField extends React.Component {

    initialState = {
        imagePreview: null,
        imageHeight: null,
        imageWidth: null,
        fileName: ''
    }

    state = { ...this.initialState }

    unBlobify = src => {
        return src.replace('blob:', '');
    }

    getBase64DataFromFilePath = filePath => {

        let image = new Image();
        image.onload = img => {
            const imageName = filePath.name
            const image = img.path[0];
            
            this.setState({
                imagePreview: image.src,
                imageName: imageName,
            })
        }

        image.src = URL.createObjectURL(filePath)

        this.props.setImage(image.src);

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(filePath);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    resetState = () => {
        this.props.setImage('');
        this.setState({ ...this.initialState })
    }

    upload = e => {
        this.getBase64DataFromFilePath(e.target.files[0]).then(
            data => this.props.setBase64File && this.props.setBase64File(data),
            error => console.log(error)
        );
    }

    render() {

        const { colWidth, labelText, userImage } = this.props;
        const { imagePreview, fileName } = this.state;

        return (
            <div className={"col-md-" + colWidth || 6}>
                <label className="col-form-label col-form-label-sm">{labelText || "No labelText selected"}</label>

                <div className="picture-upload">
                    <span className="pull-right clear-icon" onClick={this.resetState}><i className="fa fa-lg fa-times"></i></span>
                    {!imagePreview && !userImage && <div className="picture-container">
                        <div className="current-picture">
                            <div className="btn-circle btn-lg">
                                <h2>
                                    <i className="fa fa-lg fa-camera"></i>
                                </h2>
                            </div>
                        </div>
                    </div>}

                    {imagePreview && <div className="picture-preview">
                        <img src={imagePreview} style={{maxWidth: '100%', height: 'auto'}}  />
                    </div>}
                    {userImage && !imagePreview && <div className="picture-preview">
                        <img src={userImage} style={{maxWidth: '100%', height: 'auto'}} />
                    </div>}
                    
                    <div className="form-group">
                        <div className="input-group input-group-sm">
                            <span className="input-group-prepend">
                                <span className="input-group-text btn btn-sm btn-default btn-file">
                                    <i className="fa fa-file-image-o mr-2"></i> Browse... <input type="file" onChange={this.upload} />
                                </span>
                            </span>
                            <input id="profile-img" value={fileName} placeholder="(PNG, JPEG, BMP, GIF)" className="form-control" name='picture' />
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}