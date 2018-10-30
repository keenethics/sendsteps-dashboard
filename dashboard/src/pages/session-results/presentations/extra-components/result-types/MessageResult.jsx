import React, { Component } from 'react';
import { getSort, getOptions, getDateFormatter, getStatusColumn, getMessageColumn, getUpvoteColumn} from '../../../../base/BaseTable';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { formatLabelsToKeyValuePairs } from '../../../../../scripts/arrayHelper';

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

    render() {
        
        const { messageRound } = this.props;

        return (
            <div>
                <BootstrapTable search keyField='id' className="message-result" pagination data={formatLabelsToKeyValuePairs(messageRound.labels, messageRound.results)} options={getOptions()}>
                    {messageRound.labels && messageRound.labels.map((label, index) => {
                        return this.getTableHeader(label, index);
                    })}
                </BootstrapTable>
            </div>
           
        );
    }
}

export default MessageResult;