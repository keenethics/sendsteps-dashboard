import React, { Component } from 'react';
import { FormControl, FormGroup, Form } from 'react-bootstrap'
import { generateKey, swap, firstOfObject } from '../../../../../../scripts/arrayHelper';
class ScaleContainer extends Component {

    scalePrefix = '######';

    state = {
        currentInput: 5,
        contentLoaded: false
    }

    setActive = e => {
        console.log(e.target.value)
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
                <div className="col-sm-6 pb-3">
                    <div className="custom-control custom-radio custom-control-inline">
                        <input readOnly className="form-check-input" type="radio" name="scale_1" checked={true} disabled />
                        <label className="form-check-label">1</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input className="form-check-input" onChange={this.setActive} type="radio" value={2} name="scale_2" checked={currentInput === 2} />
                        <label className="form-check-label" htmlFor="scale_2">2</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input className="form-check-input" onChange={this.setActive} type="radio" value={3} name="scale_3" checked={currentInput === 3} />
                        <label className="form-check-label" htmlFor="scale_3">3</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input className="form-check-input" onChange={this.setActive} type="radio" value={4} name="scale_4" checked={currentInput === 4} />
                        <label className="form-check-label">4</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input className="form-check-input" onChange={this.setActive} type="radio" value={5} name="scale_5" checked={currentInput === 5} />
                        <label className="form-check-label">5</label>
                    </div>
                </div>
                <div className="col-sm-6 offset-md-3">
                    <FormGroup>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-tachometer mr-2"></i> 1
                            </span>
                        </div>
                        <FormControl value={firstOfObject(options)} onChange={this.setFirstScaleText} placeholder="Example: Poor" />
                    </div>
                    </FormGroup>

                </div>
                <div className="col-sm-6 offset-md-3">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-tachometer mr-2"></i> {currentInput}
                            </span>
                        </div>
                        <FormControl value={options[Object.keys(options)[1]]} onChange={this.setLastScaleText} placeholder="Example: Great" />
                    </div>
                </div>
            </>
        );
    }
}

export default ScaleContainer;