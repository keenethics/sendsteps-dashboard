import React, { Component } from 'react';
import MultipleChoiceOption from './MultipleChoiceOption';

class MultipleChoiceContainer extends Component {

    render() {

        const { options, updateOptions, addOption, deleteOption, optionsLoaded } = this.props

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="col-sm-6 col-sm-offset-3">
                        {options && Object.keys(options).map(key => {
                            return (
                            <span key={key}>
                                <MultipleChoiceOption 
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

export default MultipleChoiceContainer;