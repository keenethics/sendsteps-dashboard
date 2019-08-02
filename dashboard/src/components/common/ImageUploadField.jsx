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

        // this.props.setImage(image.src);

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
      let formData = new FormData();
      const file = e.target.files[0];
      formData.append('file', file);
      this.props.setImage(formData);

      this.getBase64DataFromFilePath(e.target.files[0]).then(
        data => console.log(data),
        error => console.log(error)
      );
    }

    render() {

        const { colWidth, labelText, userImage } = this.props;
        const { imagePreview, fileName } = this.state;

        return (
            <div className={"col-md-" + colWidth || 6}>
                <span className="pull-right clear-icon" onClick={this.resetState}><i className="fa fa-lg fa-times"></i></span>
                <div className="picture-upload">
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
                        <label className="col-form-label">{labelText || "No labelText selected"}</label>
                        <div className="input-group">
                            <span className="input-group-addon btn btn-default btn-file">
                                Browse... <input type="file" onChange={this.upload} />
                            </span>
                            <input id="profile-img" value={fileName} placeholder="(PNG, JPEG, BMP, GIF)" className="form-control" name='picture' />
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}