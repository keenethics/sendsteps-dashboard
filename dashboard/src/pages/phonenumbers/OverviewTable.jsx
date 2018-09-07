import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';

class OverviewTable extends React.Component {

    viewFormatter = (cell, row) => {
        return <Link to={'/phonenumbers/details/' + row.id}><button className="btn btn-sm btn-primary"><i className="fa fa-eye"></i></button></Link>;
    }

    trueFalseFormatter = cell => {
        if(cell === "1") {
            return <button disabled={true} className="btn btn-sm btn-danger"><i className="fa fa-times"></i></button>;
        }
        return <button disabled={true} className="btn btn-sm btn-success"><i className="fa fa-check"></i></button>;
    }

    phonenumberFormatter = cell => {
        return <div className=""> {cell}</div>;
    }

    countryFormatter = (cell, row) => {
        return <span>{cell} ({row.countryIsoCode})</span>;
    }

    getSort(direction) {
        return !direction ? 
            <i className="fa fa-sort sort-head"></i> : 
            (
                direction === 'asc' ? 
                <i className="fa fa-sort-down sort-head"></i> : 
                <i className="fa fa-sort-up sort-head"></i> 
            );
    }

    getClearBtn = onClick => {
        return (
            <button onClick={onClick} className="btn btn-danger"><i className="fa fa-trash"></i></button>
        )
    }

    render() {

        const options = {
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            clearSearch: true,
            clearSearchBtn: this.getClearBtn
        };
        return (
            <div>
                <BootstrapTable pagination data={this.props.data} options={options} search>
                    <TableHeaderColumn width="225" headerAlign='center' dataSort caretRender={this.getSort} dataField='name' dataFormat={this.countryFormatter} >Country Code</TableHeaderColumn>
                    <TableHeaderColumn width="225" headerAlign='center' dataSort caretRender={this.getSort} dataField='displayText' isKey dataFormat={this.phonenumberFormatter} >Phonenumber</TableHeaderColumn>
                    <TableHeaderColumn width="150" headerAlign='center' dataAlign='center'  dataSort caretRender={this.getSort} dataField='foreignerCompatible' dataFormat={this.trueFalseFormatter} >International</TableHeaderColumn>
                    <TableHeaderColumn width="100" headerAlign='center' dataAlign='center' dataSort caretRender={this.getSort} dataField='public' dataFormat={this.trueFalseFormatter} >Public</TableHeaderColumn>
                    <TableHeaderColumn width="75" headerAlign='center' dataAlign='center' dataField='phoneNumber' dataFormat={this.viewFormatter} >View</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default TableView;