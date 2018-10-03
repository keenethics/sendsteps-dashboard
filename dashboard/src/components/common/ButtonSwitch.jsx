import React, { Component } from 'react';

class ButtonSwitch extends Component {

    render() {

        const { enabled, onChange, options } = this.props;

        const activeClassName = "btn btn-" + (enabled ? "success active" : "default");
        const inactiveClassName = "btn btn-" + (!enabled ? "default active" : "default");

        return (
            <div>
                <div className="btn-group">
                    {!options && 
                    <span>
                        <div onClick={() => onChange ? onChange(true) : console.log(true)} className={activeClassName}>
                            <i className="fa fa-check"></i> On
                        </div>
                        <div onClick={() => onChange ? onChange(false) : console.log(false)} className={inactiveClassName}>
                            <i className="fa fa-times"></i> Off
                        </div>
                    </span>}
                    {options &&
                        options.map((option, index) => {
                            return (
                                <div className="btn btn-default" key={index} onClick={() => onChange ? onChange(option) : console.log(option) } >
                                    {option}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ButtonSwitch;