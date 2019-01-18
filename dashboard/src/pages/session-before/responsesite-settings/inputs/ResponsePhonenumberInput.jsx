import React, { Component } from 'react';
import TooltipNotification from '../../../../components/common/TooltipNotification';

class ResponsePhonenumberInput extends Component {

    render() {

        const { currentPhonenumber } = this.props;

        return (
            <div className="form-group">
                <label className="col-sm-3 control-label">Phone number <TooltipNotification 
                    title={"Phone number"}
                    tooltip={
                        <span className="text-left">
                            <h5>Phone number</h5>
                            <p>This phone number will be published on the instruction and question slides and can be used for those attendees wishing to respond via SMS. </p>
                            <p>A SMS response always starts with the response code.</p>
                        </span>}>
                        <i className="fa fa-question-circle"></i>
                    </TooltipNotification>
                </label>
                <div className="col-sm-6">
                    {!currentPhonenumber && <span>Loading...</span>}
                    {currentPhonenumber && 
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-phone"></i>
                        </span>
                        <input disabled={"disabled"} type="text" value={currentPhonenumber.displayText} className="form-control" />
                    </div>}
                </div>
            </div>
        );
    }
}

export default ResponsePhonenumberInput;