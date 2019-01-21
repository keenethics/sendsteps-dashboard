import React, { Component } from 'react';

class ButtonSwitch extends Component {

    render() {

        const { onChange, options, optionText, selected } = this.props;

        const isActive = selected === "1" && "success btn-success active";
        const isInactive = selected === "0" && "active";

        return (
            <div>
                <div className="btn-group">
                    {!options && 
                    <span>
                        <div onClick={() => onChange ? onChange(true) : console.log(true)} className={"btn btn-default " + isActive}>
                            <i className="fa fa-check"></i> On
                        </div>
                        <div onClick={() => onChange ? onChange(false) : console.log(false)} className={"btn btn-default " + isInactive}>
                            <i className="fa fa-times"></i> Off
                        </div>
                    </span>}
                    {options &&
                        options.map((option, index) => {
                            let selectedIndex = parseInt(selected, 10);
                            if(isNaN(selectedIndex)) {
                                selectedIndex = 1;
                            }
                            return (
                                <div className={"btn btn-default " + (selectedIndex === (index + 1) && "active") } key={index} onClick={() => onChange ? onChange(option) : console.log(option) } >
                                    {(optionText && typeof optionText[index] !== 'undefined') && optionText[index]}
                                    {!optionText && option}
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