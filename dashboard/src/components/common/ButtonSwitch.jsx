import React, { Component } from 'react';

class ButtonSwitch extends Component {

    render() {

        const { enabled, onChange, options } = this.props;

        const activeClassName = "btn btn-" + (enabled ? "success active" : "default");
        const inactiveClassName = "btn btn-" + (!enabled ? "default active" : "default");

        return (
            <div>
                <div className="btn-group">
                    <div onClick={() => onChange(true)} className={activeClassName}>
                        <i className="fa fa-check"></i> {options && options[0] ? options[0] : "On"}
                    </div>
                    <div onClick={() => onChange(false)} className={inactiveClassName}>
                        <i className="fa fa-check"></i>  {options && options[1] ? options[1] : "Off"}
                    </div>
                </div>
            </div>
        )
    }
}

export default ButtonSwitch;