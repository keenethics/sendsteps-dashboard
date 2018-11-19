import React, { Component } from 'react';
import { DropdownButton, MenuItem, Button } from 'react-bootstrap';
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
            <div className="btn-toolbar pull-right result-options">
                <TooltipNotification title="pie-chart" tooltip={selectedResultIds.length < 1 ? "Select some results to export" : "Export"} placement={"top"}>
                    <DropdownButton title={"Export (" + selectedResultIds.length + ")"} disabled={selectedResultIds.length < 1} id="bg-vertical-dropdown-3">
                        <MenuItem onClick={() => this.exportPDF()}>Export PDF (.pdf)</MenuItem>
                        <MenuItem onClick={() => this.exportExcel()} >Export to Excel (.xlsx)</MenuItem>
                    </DropdownButton>
                </TooltipNotification>

                <div className="btn-group">
                    <Button onClick={this.changeResultGroupType} active={resultsGrouped}>
                        Group Results
                    </Button>
                    <Button onClick={this.changeResultGroupType} active={resultsPerPerson}>
                        Results per Person
                    </Button>
                </div>
                <TooltipNotification title="pie-chart" tooltip={"Pie Chart"} placement={"top"}>
                    <Button onClick={this.changeChartType} active={pieChartResults}>
                        <i className="fa fa-chart-pie"></i>
                    </Button>
                </TooltipNotification>

                <TooltipNotification title="bar-chart" tooltip={"Bar Chart"} placement={"top"}>
                    <Button onClick={this.changeChartType} active={barChartResults} className="btn btn-default">
                        <i className="fa fa-chart-bar"></i>
                    </Button>
                </TooltipNotification>

                <TooltipNotification title="side-bar-chart" tooltip={"Side Bar Chart"} placement={"top"}>
                    <Button onClick={this.changeSideChart} active={sideBarChart} className="btn btn-default">
                        <i className="fa fa-chart-bar side-chart"></i>
                    </Button>
                </TooltipNotification>

                <TooltipNotification title="percentage-result" tooltip={"Results as Percentage"} placement={"top"}>
                    <Button onClick={this.changeResultsNumericType} active={percentageResults} className="btn btn-default">
                        <i className="fa fa-percent"></i>
                    </Button>
                </TooltipNotification>

                <TooltipNotification title="numeric-result" tooltip={"Numeric Results"} placement={"top"}>
                    <Button onClick={this.changeResultsNumericType} active={numericResults} className="btn btn-default">
                        <strong><small>...123</small></strong>
                    </Button>
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