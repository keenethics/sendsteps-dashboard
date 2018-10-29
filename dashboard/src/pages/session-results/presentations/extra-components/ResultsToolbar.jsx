import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import TooltipNotification from '../../../../components/common/TooltipNotification';
import { connect } from 'react-redux';
import * as jsPDF from 'jspdf';

class ResultsToolbar extends Component {

    exportExcel = () => {

    }

    exportPDF = () => {

        // @TODO Move this to separate component
        const doc = new jsPDF();
        const { data } = this.props;

        doc.setFont('Roboto Slab');
        doc.setTextColor(0, 122, 194);
        doc.setFontSize(24);

        doc.text(data.name, 20, 20);

        doc.setFontSize(16);
        doc.text('StartTime: ' + this.getTime().startTime, 20, 30);
        doc.text('EndTime: ' + this.getTime().endTime, 20, 40);
        doc.save(data.name + '.pdf');
    }

    render() {
        const { selectedResultIds } = this.props;

        return (
            <div className="btn-toolbar pull-right">
                <TooltipNotification title="pie-chart" tooltip={selectedResultIds.length < 1 ? "Select some results to export" : "Export"} placement={"top"}>
                    <DropdownButton title={"Export (" + selectedResultIds.length + ")"} disabled={selectedResultIds.length < 1} id="bg-vertical-dropdown-3">
                        <MenuItem onClick={() => this.exportPDF()}>Export PDF (.pdf)</MenuItem>
                        <MenuItem onClick={() => this.exportExcel()} >Export to Excel (.xlsx)</MenuItem>
                    </DropdownButton>
                </TooltipNotification>

                <div className="btn-group">
                    <button className="btn btn-default">
                        Group Results
                    </button>
                    <button className="btn btn-default">
                        Results per Person
                    </button>
                </div>
                <TooltipNotification title="pie-chart" tooltip={"Pie Chart"} placement={"top"}>
                    <button className="btn btn-default">
                        <i className="fa fa-chart-pie"></i>
                    </button>
                </TooltipNotification>

                <TooltipNotification title="bar-chart" tooltip={"Bar Chart"} placement={"top"}>
                    <button className="btn btn-default">
                        <i className="fa fa-chart-bar"></i>
                    </button>
                </TooltipNotification>

                <TooltipNotification title="side-bar-chart" tooltip={"Side Bar Chart"} placement={"top"}>
                    <button className="btn btn-default">
                        <i className="fa fa-chart-bar side-chart"></i>
                    </button>
                </TooltipNotification>

                <TooltipNotification title="percentage-result" tooltip={"Results as Percentage"} placement={"top"}>
                    <button className="btn btn-default">
                        <i className="fa fa-percent"></i>
                    </button>
                </TooltipNotification>

                <TooltipNotification title="numeric-result" tooltip={"Numeric Results"} placement={"top"}>
                    <button className="btn btn-default">
                        <strong><small>...123</small></strong>
                    </button>
                </TooltipNotification>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            selectedResultIds: state.sessionResultsReducer.selectedResultIds
        }
    }
) (ResultsToolbar);