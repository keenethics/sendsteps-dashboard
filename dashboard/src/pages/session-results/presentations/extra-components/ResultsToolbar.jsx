import React, { Component } from 'react';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { connect } from 'react-redux';
import { formatLabelsToKeyValuePairs } from '../../../../scripts/arrayHelper';
import * as jsPDF from 'jspdf';
import { toast } from 'react-toastify';

class ResultsToolbar extends Component {

    state = {
        resultsGrouped: true,
        resultsPerPerson: false,

        pieChartResults: true,
        barChartResults: false,
        sideBarChart: false,

        numericResults: true,
        percentageResults: false
    }

    changeSideChart = () => {
        this.setState({
            sideBarChart: !this.state.sideBarChart
        });
    }

    changeChartType = () => {
        this.setState({
            pieChartResults: this.state.barChartResults,
            barChartResults: this.state.pieChartResults
        });
    }

    changeResultsNumericType = () => {
        this.setState({
            numericResults: this.state.percentageResults,
            percentageResults: this.state.numericResults
        })
    }

    changeResultGroupType = () => {
        this.setState({
            resultsGrouped: this.state.resultsPerPerson,
            resultsPerPerson: this.state.resultsGrouped
        })
    }

    exportExcel = () => {
        // const results = this.getSelectedResults();
        toast("This doesn't really do anything yet.")
    }

    getSelectedResults() {
        const { data, selectedResultIds } = this.props;
        const { rounds } = data;
        let resultsList = [];
        selectedResultIds.forEach(selectedId => {
            rounds.forEach(round => {
                if(selectedId === round.id) {
                    resultsList.push(formatLabelsToKeyValuePairs(round.labels, round.results));
                }
            })
        })
        return resultsList;
    }

    exportPDF = () => {
        // const results = this.getSelectedResults();
        const doc = new jsPDF();
        // Create title page
        doc.setTextColor(0, 122, 194);
        doc.setFontSize(20);
        doc.setFont('Helvetica');
        doc.text("Presentation Results", 30, 30);
        // For each round/question or something. do this:
            doc.addPage();
            doc.setFontSize(16);
            doc.text("Something", 20, 20)
            doc.save('someResults.pdf');
        
        
        toast("PDF exported as someResults.pdf!");
    }

    render() {
        const { selectedResultIds } = this.props;
        const { 
            resultsGrouped, 
            resultsPerPerson, 
            pieChartResults, 
            barChartResults, 
            sideBarChart, 
            numericResults, 
            percentageResults } = this.state;

        return (
            <div className="btn-toolbar pull-right result-options ">
                <TooltipNotification title="pie-chart" tooltip={selectedResultIds.length < 1 ? "Select some results to export" : "Export"} placement={"top"}>
                    <DropdownButton className="mr-2 mt-2" title={"Export (" + selectedResultIds.length + ")"} disabled={selectedResultIds.length < 1} id="bg-vertical-dropdown-3">
                        <Dropdown.Item onClick={() => this.exportPDF()}>Export PDF (.pdf)</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.exportExcel()} >Export to Excel (.xlsx)</Dropdown.Item>
                    </DropdownButton>
                </TooltipNotification>

                <div className="btn-group mr-2 mt-2">
                    <button className={"btn btn-outline-secondary " + (resultsGrouped && "active")} onClick={this.changeResultGroupType}>
                        Group Results
                    </button>
                    <button className={"btn btn-outline-secondary " + (resultsPerPerson && "active")} onClick={this.changeResultGroupType}>
                        Results per Person
                    </button>
                </div>
                <TooltipNotification title="pie-chart" tooltip={"Pie Chart"} placement={"top"}>
                    <button className={"btn btn-outline-secondary mr-2 mt-2 " + (pieChartResults && "active")} onClick={this.changeChartType} >
                        <i className="fa fa-pie-chart"></i>
                    </button>
                </TooltipNotification>

                <TooltipNotification title="bar-chart" tooltip={"Bar Chart"} placement={"top"}>
                    <button className={"btn btn-outline-secondary mr-2 mt-2 " + (barChartResults && "active")} onClick={this.changeChartType}>
                        <i className="fa fa-bar-chart"></i>
                    </button>
                </TooltipNotification>

                <TooltipNotification title="side-bar-chart" tooltip={"Side Bar Chart"} placement={"top"}>
                    <button className={"btn btn-outline-secondary mr-2 mt-2 " + (sideBarChart && "active")} onClick={this.changeSideChart}>
                        <i className="fa fa-bar-chart side-chart"></i>
                    </button>
                </TooltipNotification>

                <TooltipNotification title="percentage-result" tooltip={"Results as Percentage"} placement={"top"}>
                    <button className={"btn btn-outline-secondary mr-2 mt-2 " + (percentageResults && "active")} onClick={this.changeResultsNumericType}>
                        <i className="fa fa-percent"></i>
                    </button>
                </TooltipNotification>

                <TooltipNotification title="numeric-result" tooltip={"Numeric Results"} placement={"top"}>
                    <button className={"btn btn-outline-secondary mr-2 mt-2 " + (numericResults && "active")} onClick={this.changeResultsNumericType}>
                        <small>...123</small>
                    </button>
                </TooltipNotification>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            selectedResultIds: state.sessionResultsReducer.selectedResultIds,
        }
    }
) (ResultsToolbar);