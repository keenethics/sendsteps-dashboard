import * as React from 'react'; 
import moment from 'moment';
import ExcelView from '../../pages/superadmin/phonenumbers/extra_components/ExcelView';
import TooltipNotification from '../../components/common/TooltipNotification';
import './BaseTable.scss';

export const getNameFormatter = cell => {
    return <strong>{cell}</strong>
}

export const getPhonenumberFormatter = cell => {
    return <span><code>{cell}</code></span>;
}

export const getCountryFormatter = (cell, row) => {
    return <span>{cell} ({row.countryIsoCode})</span>;
}

export const getLabelFormatter = (cell, row) => {
    return <span className="label label-primary">{cell}</span>
}

export const getTrueFalseFormatter = cell => {
    if(!!cell) {
        return <button disabled={true} className="tf-button btn btn-danger"><i className="fa fa-times"></i> No </button>;
    }
    return <button disabled={true} className="tf-button btn btn-success"><i className="fa fa-check"></i> Yes</button>;
}

export const getSort = direction => {
    return !direction ? 
    <i className="fa fa-sort sort-head"></i> : 
    (
        direction === 'asc' ? 
        <i className="fa fa-sort-down sort-head"></i> : 
        <i className="fa fa-sort-up sort-head"></i> 
    );
}

export const getParticipantFormatter = cell => {
    return <span><i className="fa fa-users"></i> x {cell}</span>
}
export const getStatusColumn = (status) => {
    // 'unread','read','edited','showing','shown','removed','copied'
    return (
    <span className="text-center">
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
    </span>)
}

export const getOptions = () => {
    return {
        prePage: 'Prev', // Previous page button text
        nextPage: 'Next', // Next page button text
        clearSearch: true,
        clearSearchBtn: (clearSearch) => getClearButton(clearSearch)
    };
}

function getClearButton(clearSearch) {
    return <span className="input-group-append"><button onClick={clearSearch} className="btn btn-danger btn-sm"><i className="fa fa-times"></i></button></span>
}

export const getMessageColumn = message => {
    return <span><p className="message-col">{message}</p></span>
}

export const getUpvoteColumn = upvoteCount => {
    return <span className="text-center"><div><i className="fa fa-heart"></i> x {upvoteCount}</div></span>;
}

export const getDateFormatter = time => {
    let startTime = moment(time, 'YYYY-MM-DD HH:mm:ss')
    return <TooltipNotification title={1} placement="top" tooltip={<span><i className="fas fa-clock-o"></i> {startTime.fromNow()}</span>} >
            <span className="date-col">
                <div className="btn btn-static date">
                    <i className="fa fa-calendar"></i> {startTime.format("dddd, MMMM Do YYYY")} 
                </div>
                <div className="btn btn-static date">
                    <i className="fa fa-clock-o"></i> {startTime.format("h:mm:ss a")} 
                </div>
            </span>
    </TooltipNotification>
}

export const getExcelBtn = data => {
    return <ExcelView data={data} />
}
