import React, { Component } from 'react';
import { FormGroup, InputGroup, FormControl } from "react-bootstrap";
import TooltipNotification from 'App/components/common/TooltipNotification';

class MultipleChoiceOption extends Component {

    state = {
        addedNext: false
    }

    setOptionText = e => {
        const { optionKey, addOption, deleteOption, setOptionText } = this.props
        let { addedNext } = this.state

        setOptionText(e.target.value, optionKey)
        if(!addedNext) {
            addOption();
            addedNext = true
        } 

        if(e.target.value.length < 1) {
            deleteOption(optionKey)
            addedNext = false
        }
        this.setState({ addedNext })
    }

    deleteOption = () => {
        const { optionKey, deleteOption } = this.props;
        deleteOption(optionKey)
    }

    isGeneratedKey = key => {
        return !Number.isInteger(parseInt(key, 10))
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.optionKey) {
            if(!this.isGeneratedKey(nextProps.optionKey)) {
                this.setState({addedNext: true})
            }
        }
    }

    render() {

        const { addedNext } = this.state
        const { option, optionKey } = this.props;

        return (
            <FormGroup>
                <div className="input-group input-group-sm">
                    <div className="input-group-prepend disabled">
                        <div className="input-group-text px-3">
                            <input type="checkbox" disabled="disabled" />
                        </div>
                    </div>
                    <FormControl id={'mpc_option_' + optionKey} placeholder="Answer Option" value={option} onChange={this.setOptionText} type="text" />
                    {(addedNext || !this.isGeneratedKey(optionKey)) &&
                    <div onClick={this.deleteOption} className="input-group-append">
                        <button className="btn btn-sm btn-outline-danger">
                            <TooltipNotification tooltip="Remove Option">
                                <i className="fa fa-trash px-1"></i>
                            </TooltipNotification>
                        </button>
                    </div>}
                </div>
            </FormGroup>
        );
    }
}

export default MultipleChoiceOption;