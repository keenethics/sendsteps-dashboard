import React, { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap'
import { generateKey, swap, firstOfObject } from '../../../../../../scripts/arrayHelper';
class ScaleContainer extends Component {

    scalePrefix = '######';

    state = {
        currentInput: 5,
        contentLoaded: false
    }

    setActive = e => {
        const { options, updateOptions } = this.props;
        this.setState({currentInput: parseInt(e.target.value, 10)})
        updateOptions(parseInt(e.target.value, 10), Object.keys(options)[2]);
    }

    componentWillReceiveProps(nextProps) {
        if(this.isFetchedData(nextProps.options)) {
            this.props.setAllOptions(this.formatOptions(nextProps.options))
        } 
        else if(Object.keys(nextProps.options).length < 3) {
            this.props.setAllOptions(this.formatInitial());
        }
    }

    formatOptions = options => {
        const option = firstOfObject(options);
        let optionList = option.split(this.scalePrefix).filter((option, index) => index !== 0)

        const [ scaleInputNumber, firstScaleOption, secondScaleOption ] = optionList

        this.setState({ currentInput: parseInt(scaleInputNumber, 10) })

        return {
            [generateKey()]: firstScaleOption,
            [generateKey()]: secondScaleOption,
            [generateKey()]: scaleInputNumber
        }
    }

    formatInitial = () => {
        return {
            [generateKey()]: "",
            [generateKey()]: "",
            [generateKey()]: 5            
        }
    }

    isFetchedData = options => {
        return options[Object.keys(options)[0]].indexOf(this.scalePrefix) !== -1
    }

    setFirstScaleText = e => {
        const { options, updateOptions } = this.props;
        updateOptions(e.target.value, Object.keys(options)[0]);
    }

    setLastScaleText = e => {
        const { options, updateOptions } = this.props;
        updateOptions(e.target.value, Object.keys(options)[1]);
    }

    render() {

        const { options } = this.props;
        const { currentInput } = this.state

        return (
            <>
                <FormGroup>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-6 col-sm-offset-3">
                                <label className="radio-inline"><input type="radio" name="scale_1" checked={true} disabled />1</label>
                                <label className="radio-inline"><input checked={currentInput === 2} onChange={this.setActive} type="radio" value={2} name="scale_2" />2</label>
                                <label className="radio-inline"><input checked={currentInput === 3} onChange={this.setActive} type="radio" value={3} name="scale_3" />3</label>
                                <label className="radio-inline"><input checked={currentInput === 4} onChange={this.setActive} type="radio" value={4} name="scale_4" />4</label>
                                <label className="radio-inline"><input checked={currentInput === 5} onChange={this.setActive} type="radio" value={5} name="scale_5" />5</label>
                            </div>
                        </div>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-6 col-sm-offset-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-tachometer"></i> 1
                                        </span>
                                    </div>
                                    <FormControl value={firstOfObject(options)} onChange={this.setFirstScaleText} placeholder="Example: Poor" />
                                </div>
                            </div>
                        </div>
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-6 col-sm-offset-3">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-tachometer"></i> {currentInput}
                                        </span>
                                    </div>
                                    <FormControl value={options[Object.keys(options)[1]]} onChange={this.setLastScaleText} placeholder="Example: Great" />
                                </div>
                            </div>
                        </div>
                    </div>
                </FormGroup>
            </>
        );
    }
}

export default ScaleContainer;