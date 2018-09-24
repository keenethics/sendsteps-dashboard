import React from 'react';

export const InputField = props => {
    return (
        <div className="form-group">    
            {props.labelText && 
            <label className="control-label">
                {props.labelText}
            </label>}
            {props.extraLabelText || ""}
            <div className="input-group">
                {props.leftFaIcon && <span className="input-group-addon">
                    <i className={"fa fa-" + props.leftFaIcon}></i>
                </span>}
                <input 
                    onChange={props.onChange || function() { console.log('No Onchange attribute supplied') }}
                    placeholder={props.placeholder || ""} 
                    id={props.inputId || ""} 
                    className="form-control" 
                    readonly={props.readonly && "readonly"}/>
                {props.rightFaIcon && <span className="input-group-addon">
                    <i className={"fa fa-" + props.rightFaIcon}></i>
                </span>}                                   
            </div>
        </div>
    )
}