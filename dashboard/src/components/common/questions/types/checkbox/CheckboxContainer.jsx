import React, { Component } from 'react';
import CheckboxOption from './CheckboxOption'

class CheckboxContainer extends Component {
    render() {

        const { options, updateOptions, addOption, deleteOption, optionsLoaded } = this.props

        return (
            <div className="col-sm-9">
                {options && Object.keys(options).map(key => {
                    return (
                    <span key={key}>
                        <CheckboxOption 
                            optionsLoaded={optionsLoaded}
                            setOptionText={updateOptions}
                            addOption={addOption}
                            deleteOption={() => deleteOption(key)}
                            optionKey={key}
                            option={options[key]} 
                        />
                    </span>)
                })}
            </div>
        );
    }
}

export default CheckboxContainer;