import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { getSort, getOptions, getNameFormatter, getDateFormatter, getParticipantFormatter } from '../../base/BaseTable';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Link } from 'react-router-dom';
import { filterEmptyResults } from './actions';
import { connect } from 'react-redux';

class OverviewTable extends Component {

    state = {
        showEmptyResults: true,
    }

    viewFormatter = (cell, row) => {
        return <Link to={'/session-results/presentations/details/' + row.id}><button className="btn btn-primary"><i className="fa fa-eye"></i> View</button></Link>;
    }

    toggleShowEmpty = () => {
        this.setState({
            showEmptyResults: !this.state.showEmptyResults
        })
        this.props.dispatch(filterEmptyResults());
    }

    componentDidMount() {
        if(!this.state.showEmptyResults) {
            this.props.dispatch(filterEmptyResults());
        }
    }

    getExtraButtonGroup = () => {

        const { showEmptyResults } = this.state;

        const enabledIcon = <i className="fa fa-eye"></i> 
        const disabledIcon = <i className="fa fa-eye-slash"></i> 

        return <span>
            <div className="btn btn-primary" active={showEmptyResults} onClick={this.toggleShowEmpty} className="btn btn-outline-secondary">
                {showEmptyResults ? disabledIcon : enabledIcon } Hide empty
            </div> 
        </span>
    }

    getOptions = () => {
        return {
            ...getOptions(),
            sortName: 'startTime',
            sortOrder: 'desc',
            btnGroup: () => this.getExtraButtonGroup()
        }
    }

    handleFilter(data) {
        const { showEmptyResults } = this.state;

        if(!showEmptyResults) {
            return data;
        }
        let filteredResults = [];
        data.forEach(result => {
            if(result.numberOfParticipants > 0) {
                filteredResults.push(result);
            }
        });
        return filteredResults;
    }
    render() {

        const { data } = this.props;
        return (
            <div>
                <BootstrapTable pagination data={this.handleFilter(data)} keyField='id' options={this.getOptions()} search>
                    <TableHeaderColumn headerAlign='center' dataSort caretRender={getSort} dataField='name' dataFormat={getNameFormatter} >Name</TableHeaderColumn>
                    <TableHeaderColumn width="150" headerAlign='center' dataAlign='center' dataSort caretRender={getSort} dataField='numberOfParticipants' dataFormat={getParticipantFormatter} >Participants</TableHeaderColumn>
                    <TableHeaderColumn width="300" headerAlign='center' dataSort caretRender={getSort} dataField='startTime' dataFormat={getDateFormatter} >Start time</TableHeaderColumn>
                    <TableHeaderColumn width="125" headerAlign='center' dataAlign='center' dataField='presentationId' dataFormat={this.viewFormatter} >View</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default connect() (OverviewTable);