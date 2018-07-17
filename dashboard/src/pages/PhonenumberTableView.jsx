import React from 'react';
import { Well } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import TableHeaderColumn from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


class PhonenumberTableView extends React.Component {

    doSomething(phoneNumber) {
        window.location.href = window.location.href + '/' + phoneNumber; 
    }

    viewFormatter = cell => {
        return <button onClick={() => this.doSomething(cell)} className="btn btn-lg btn-primary"><i className="fa fa-eye"></i></button>
    }

    internationalFormatter = cell => {
        if(cell === "1") {
            return <button onClick={() => this.doSomething(cell)} disabled={true} className="btn btn-lg btn-danger"><i className="fa fa-times"></i></button>
        }
        return <button onClick={() => this.doSomething(cell)} disabled={true} className="btn btn-lg btn-success"><i className="fa fa-check"></i></button>
    }

    phonenumberFormatter = cell => {
        return <Well bsSize="small">{cell}</Well>
    }

    render() {
        
        const columns = [
            {
                dataField: 'name',
                text: 'Country',
                sort: true,
                filter: textFilter()
            }, 
            {
                dataField: 'countryIsoCode',
                text: 'Country Code',
                sort: true,
                filter: textFilter()
            }, 
            {
                dataField: 'foreignerCompatible',
                text: 'International',
                sort: true,
                formatter: this.internationalFormatter,
                filter: textFilter()
            }, 
            {
                dataField: 'displayText',
                text: 'Phonenumber',
                sort: true,
                formatter: this.phonenumberFormatter,
                filter: textFilter()
            },  
            {
                dataField: 'phoneNumber',
                text: 'View',
                formatter: this.viewFormatter,
                filter: textFilter()
            }
        ];
          
        return (
            <BootstrapTable 
                pagination={paginationFactory()} 
                filter={filterFactory()}
                keyField='id' 
                data={this.props.data} 
                columns={columns} />
        )
    }
}
export default PhonenumberTableView;