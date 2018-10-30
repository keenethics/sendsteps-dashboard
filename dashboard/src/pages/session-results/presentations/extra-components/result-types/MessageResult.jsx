import React, { Component } from 'react';
import { getSort, getOptions, getDateFormatter, getStatusColumn, getMessageColumn, getUpvoteColumn} from '../../../../base/BaseTable';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';
import { formatLabelsToKeyValuePairs } from '../../../../../scripts/arrayHelper';
import { toast } from 'react-toastify'; 

class MessageResult extends Component {

    getTableHeader(label, index) {
        let dataFormat;
        switch(index) {
            case 1: dataFormat = getDateFormatter
            break;
            case 2: dataFormat = getStatusColumn
            break;
            case 3: dataFormat = getUpvoteColumn
            break;
            default: dataFormat = getMessageColumn
        }
        return <TableHeaderColumn key={index} width={index < 2 ? "250px" : "50px"} headerAlign='center' dataSort dataFormat={dataFormat} caretRender={getSort} dataField={label} >{label}</TableHeaderColumn>
    }

    toggleWordCloud = () => {
        toast("This doesn't really do anything yet.")
    }

    getExtraButtonGroup() {
        return <Button onClick={this.toggleWordCloud}><i className="fa fa-cloud"></i> Show as WordCloud</Button>;
    }

    getOptions = () => {
        return {
            ...getOptions(),
            btnGroup: () => this.getExtraButtonGroup()
        }
    }

    render() {
        
        const { messageRound } = this.props;

        return (
            <div>
                <BootstrapTable search keyField='id' className="message-result" pagination data={formatLabelsToKeyValuePairs(messageRound.labels, messageRound.results)} options={this.getOptions()}>
                    {messageRound.labels && messageRound.labels.map((label, index) => {
                        return this.getTableHeader(label, index);
                    })}
                </BootstrapTable>
            </div>
           
        );
    }
}

export default MessageResult;