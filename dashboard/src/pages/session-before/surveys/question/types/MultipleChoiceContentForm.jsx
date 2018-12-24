import React, { Component } from 'react';
import MultipleChoiceOption from './MultipleChoiceOption';
class MultipleChoiceContentForm extends Component {

    state = {
        options: [
            ""
        ]
    }

    addOption = () => {
        console.log(this.state.options)
        this.setState({
            options: [
                ...this.state.options,
                ""
            ]
        })
    }

    deleteOption = optionIndex => {
        const { options } = this.state
        const filteredOptions = options.filter(option => { return options.indexOf(option) !== optionIndex })
        this.setState({options: filteredOptions.length > 0 ? filteredOptions : [""]})
    }


    setOptionText = (text, optionIndex) =>  {

        let options = this.state.options;
        options[optionIndex] = text
        this.setState({
            options
        })
    }

    render() {

        const { options } = this.state

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="col-sm-6 col-sm-offset-3">
                        {options && options.map((optionText, index) => {
                            return (
                            <span key={index}>
                                <MultipleChoiceOption 
                                    setOptionText={this.setOptionText}
                                    deleteOption={this.deleteOption} 
                                    optionIndex={index} 
                                    addOption={this.addOption} 
                                    optionText={optionText} 
                                />
                            </span>)
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default MultipleChoiceContentForm;