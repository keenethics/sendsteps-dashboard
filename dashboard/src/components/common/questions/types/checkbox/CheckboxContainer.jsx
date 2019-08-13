import React, { Component } from 'react';
import CheckboxOption from './CheckboxOption'
import $ from 'jquery';
class CheckboxContainer extends Component {

    deleteOption = key => {
        const optionToDelete = document.getElementById('check_option_' + key);
        const opts = $(optionToDelete).closest(".check-opts").find(':input');
        opts[opts.length - 1].focus();
        this.props.deleteOption(key)
    }

    render() {

        const { options, updateOptions, addOption, deleteOption, optionsLoaded } = this.props

        return (
            <div className="col-sm-9 check-opts">
                {options && Object.keys(options).map(key => {
                    return (
                    <span key={key}>
                        <CheckboxOption 
                            optionsLoaded={optionsLoaded}
                            setOptionText={updateOptions}
                            addOption={addOption}
                            deleteOption={() => this.deleteOption(key)}
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