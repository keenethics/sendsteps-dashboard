import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class CreateQuestionContainer extends Component {

    state = {
        newQuestionName: "",
        newQuestionExpand: false
    }

    setQuestion = e => {
        let newQuestionExpand = false
        if(e.target.value.length > 0) {
            newQuestionExpand = true
        }
        this.setState({
            newQuestionExpand,
            newQuestionName: e.target.value
        })
    }
    
    render() {
        const { newQuestionName } = this.state
        return (
            <FormGroup validationState={"error"}>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-3">
                            <ControlLabel className="lh-32">New Question</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="fa fa-list"></i>
                                </span>
                                <FormControl
                                    type="text"
                                    value={newQuestionName}
                                    placeholder="Type a new question"
                                    onChange={this.setQuestion}
                                />
                            </div>
                            <span className="help-block"><i className="fa fa-exclamation-triangle fa-xs"></i> Some Error</span>
                        </div>
                    </div>
                </div>
            </FormGroup>
        );
    }
}

export default CreateQuestionContainer;