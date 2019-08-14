import React, { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap'
import { generateKey, firstOfObject } from 'App/scripts/arrayHelper';

class ScaleContainer extends Component {

    scalePrefix = '######';

    state = {
        currentInput: 5,
        contentLoaded: false
    }

    setOptions = (text, optionIndex) => {
        let { options } = this.props
        options[optionIndex] = text
        this.props.setOptions(options)
    }

    setActive = e => {
        console.log(e.target.value)
        const { options } = this.props;
        this.setState({currentInput: parseInt(e.target.value, 10)})
        this.setOptions(parseInt(e.target.value, 10), Object.keys(options)[2]);
    }

    componentWillReceiveProps(nextProps) {
        if(this.isFetchedData(nextProps.options)) {

            this.props.setOptions(this.formatOptions(nextProps.options))
        } 
        else if(Object.keys(nextProps.options).length < 3) {
            this.props.setOptions(this.formatInitial());
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
        const { options} = this.props;
        this.setOptions(e.target.value, Object.keys(options)[0]);
    }

    setLastScaleText = e => {
        const { options } = this.props;
        this.setOptions(e.target.value, Object.keys(options)[1]);
    }

    render() {

        const { options } = this.props;
        const { currentInput } = this.state

        return (
            <>
                <div className="col-sm-6 pb-3 small">
                    <div className="custom-control custom-radio custom-control-inline">
                        <input readOnly className="form-check-input" type="radio" name="scale_1" checked={true} disabled />
                        <label className="form-check-label">1</label>
                    </div>
                    {/* Lol */}
                    {[2,3,4,5].map(scaleAmount => {
                        return (<div key={scaleAmount} className="custom-control custom-radio custom-control-inline">
                            <input className="form-check-input" onChange={this.setActive} type="radio" value={scaleAmount} name="scale_2" checked={currentInput === scaleAmount} />
                            <label className="form-check-label" htmlFor={'scale_' + scaleAmount}>{scaleAmount}</label>
                        </div>)
                    })}
                </div>
                <div className="col-sm-9 offset-md-3">
                    <FormGroup>
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-tachometer px-1"></i> 1
                            </span>
                        </div>
                        <FormControl value={firstOfObject(options)} onChange={this.setFirstScaleText} placeholder="Example: Poor" />
                    </div>
                    </FormGroup>
                </div>
                <div className="col-sm-9 offset-md-3 mb-3">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-tachometer px-1"></i> {currentInput}
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