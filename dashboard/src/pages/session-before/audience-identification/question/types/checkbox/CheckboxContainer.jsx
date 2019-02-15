import React, { Component } from 'react';
import CheckboxOption from './CheckboxOption'

class CheckboxContainer extends Component {
    render() {

        const { options, updateOptions, addOption, deleteOption, optionsLoaded } = this.props

        console.log(options)

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="col-sm-9 col-sm-offset-3">
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
                </div>
            </div>
        );
    }
}

export default CheckboxContainer;