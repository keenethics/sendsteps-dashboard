import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class InputField extends React.Component {

    constructor(props) {
        super(props) 
        this.state = {
            value: this.props.value
        }

    }

    clearField() {
        this.setState({value: ""})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value});
    }

    render() {

        const { 
            labelText, 
            extraLabelText, 
            leftFaIcon, 
            rightFaIcon, 
            clearButton, 
            onChange, 
            readonly, 
            inputId, 
            placeholder
        } = this.props;

        return (
            <div className="form-group">    
                {labelText && 
                <label className="control-label">
                    {labelText}
                </label>}
                {extraLabelText || ""}
                <div className="input-group">
                    {leftFaIcon && <span className="input-group-addon">
                        <i className={"fa fa-" + leftFaIcon}></i>
                    </span>}
                    <input 
                        onChange={onChange || function() { console.log('No Onchange attribute supplied') }}
                        placeholder={placeholder || ""} 
                        id={inputId || ""} 
                        className="form-control" 
                        value={this.state.value}
                        readOnly={readonly && "readonly"}/>
                    {rightFaIcon && !clearButton && 
                    <span className="input-group-addon">
                        <i className={"fa fa-" + rightFaIcon}></i>
                    </span>}    
                    {clearButton && !rightFaIcon &&
                    <OverlayTrigger
                        delay={150}
                        placement={"top"}
                        overlay={<Tooltip id={inputId || ""}>Clear field</Tooltip>}>
                        <span onClick={this.clearField.bind(this)} className="input-group-addon">
                            <i className={"fa fa-times"}></i>
                        </span>
                    </OverlayTrigger>}                               
                </div>
            </div>
        )
    }
}