import React, { Component } from 'react';
import MultipleChoiceOption from './MultipleChoiceOption';
import $ from 'jquery';
import { Flipper, Flipped } from "react-flip-toolkit";

class MultipleChoiceContainer extends Component {

    deleteOption = key => {
        const optionToDelete = document.getElementById('mpc_option_' + key);
        const opts = $(optionToDelete).closest(".mpc-opts").find(':input');
        opts[opts.length - 1].focus();
        this.props.deleteOption(key)
    }

    render() {

        const { options, updateOptions, addOption, optionsLoaded } = this.props

        return (
            <div className="col-sm-9 mpc-opts">
                {options && <>
                    {Object.keys(options).map(key => {
                        return (
                        <span key={key}>
                            <MultipleChoiceOption 
                                optionsLoaded={optionsLoaded}
                                setOptionText={updateOptions}
                                addOption={addOption}
                                deleteOption={() => this.deleteOption(key)}
                                optionKey={key}
                                option={options[key]} 
                            />
                        </span>)
                    })}
                </>}
            </div>
        );
    }
}

export default MultipleChoiceContainer;