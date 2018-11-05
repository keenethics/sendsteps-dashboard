import React from 'react';
import InputField from '../../../components/common/InputField';

class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questionType: "Text",
            isRequired: true,
        }
    }

    render() {

        const { questionType, isRequired } = this.state;
        const questionTypes = ["Text", "Multiple Choice", "Checkbox"];

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label className="control-label">
                            <InputField 
                                labelText={questionType}
                            />
                            {/* <select className="form-control" onChange={this.fetchSiteSettings.bind(this)} value={null} >
                                <option value={''} >Select...</option>
                                {data && data.map(item => {
                                    return <option key={item.id} value={item.id}>{item.domain}</option>
                                })}
                            </select> */}
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;