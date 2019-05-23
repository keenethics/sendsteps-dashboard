import React, { Component } from 'react';

class ButtonSwitch extends Component {

    render() {

        const { onChange, options, optionText, selected } = this.props;

        const isActive = !!selected && "success btn-success active";
        const isInactive = !selected && "active";

        return (
            <div>
                <div className="btn-group">
                    {!options && 
                    <span>
                        <button onClick={() => onChange ? onChange(true) : console.log(true)} className={"btn btn-outline-secondary " + isActive}>
                            <i className="fa fa-check"></i> On
                        </button>
                        <button onClick={() => onChange ? onChange(false) : console.log(false)} className={"btn btn-outline-secondary " + isInactive}>
                            <i className="fa fa-times"></i> Off
                        </button>
                    </span>}
                    {options &&
                        options.map((option, index) => {
                            let selectedIndex = parseInt(selected, 10);
                            if(isNaN(selectedIndex)) {
                                selectedIndex = 1;
                            }
                            return (
                                <button className={"btn btn-outline-secondary " + (selectedIndex === (index + 1) && "active") } key={index} onClick={() => onChange ? onChange(option) : console.log(option) } >
                                    {(optionText && typeof optionText[index] !== 'undefined') && optionText[index]}
                                    {!optionText && option}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ButtonSwitch;