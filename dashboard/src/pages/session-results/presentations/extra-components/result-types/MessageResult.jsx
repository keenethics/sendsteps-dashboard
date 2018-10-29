import React, { Component } from 'react';
import moment from 'moment';
import TooltipNotification from '../../../../../components/common/TooltipNotification';
import './MessageResult.scss';

class MessageResult extends Component {

    getColumnByIndex(property, index) {
        // 0 = Message
        // 1 = Date/Time
        // 2 = Status
        // 3 = Upvotes
        switch(index) {
            case 0: {
                return this.getMessageColumn(property, index);
            }
            case 1: {
                return this.getDateTimeColumn(property, index);
            }
            case 2: {
                return this.getStatusColumn(property, index);
            }
            case 3: {
                return this.getUpvoteColumn(property, index);
            }
            default: {
                return <td key={property}>{property}</td>;
            }
        }
    }

    getMessageColumn(message, index) {
        return <td key={index} ><p className="message-col">{message}</p></td>
    }

    getUpvoteColumn(upvoteCount, index) {
        return <td key={index} className="text-center"><div><i className="fa fa-heart"></i> x {upvoteCount}</div></td>;
    }

    getStatusColumn(status, index) {
        // 'unread','read','edited','showing','shown','removed','copied'
        console.log(status)
        return (
        <td key={index} className="text-center">
            <TooltipNotification title={1} placement="top" tooltip={status}>
                <span>
                    {status === 'unread' && <i className="fa fa-eye-slash"></i>}
                    {status === 'read' && <i className="fa fa-eye"></i>}
                    {status === 'edited' && <i className="fa fa-pencil "></i>}
                    {status === 'showing' && <i className="fa fa-desktop text-success"></i>}
                    {status === 'shown' && <i className="fa fa-eye disabled"></i>}
                    {status === 'removed' && <i className="fa fa-times text-danger"></i>}
                    {status === 'copied' && <i className="fa fa-file text-warning"></i>}
                </span>
            </TooltipNotification>
        </td>)
    }

    getDateTimeColumn(dateTime, index) {
        let startTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss');

        return(
            <td key={index} className="text-center">
                <TooltipNotification title={1} placement="top" tooltip={<span><i className="fas fa-clock"></i> {startTime.fromNow()}</span>} >
                    <span className="text-center">
                        <div className="btn btn-static date">
                            <i className="far fa-calendar-alt"></i> {startTime.format("dddd, MMMM Do YYYY")} 
                        </div>
                        <div className="btn btn-static date">
                            <i className="far fa-clock"></i> {startTime.format("h:mm:ss a")} 
                        </div>
                    </span>
                </TooltipNotification>
            </td>
        )
    }

    render() {
        const { messageRound } = this.props;

        return (
            <table className="table message-result" key={messageRound.id}>
                <thead>
                    <tr>
                        {messageRound.labels && messageRound.labels.map(label => {
                            return <th key={label} className="table-header" >{label}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {messageRound.results && messageRound.results.map((result) => {
                        return (
                        <tr key={result}> 
                            {result.map((property, index) => {
                                return this.getColumnByIndex(property, index);
                            })}
                        </tr>)
                    })}
                </tbody>
            </table>
        );
    }
}

export default MessageResult;