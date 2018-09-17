import React from 'react';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class ExcelView extends React.Component {
    render() {

        const { data } = this.props;
        const excelButton = <button className="btn btn-sm btn-success"><i className="fa fa-file-excel"></i> Download Excel (.xlsx)</button>
        
        return (
            <ExcelFile element={excelButton} className="btn btn-primary" filename="phonenumbers">
                <ExcelSheet data={data} name="Phonenumbers">
                    <ExcelColumn label="Id" value="id"/>
                    <ExcelColumn label="Country" value="name" />
                    <ExcelColumn label="Country Code" value={(col) => "(" + col.isoCode + ")"} />
                    <ExcelColumn label="International" value={(col) => col.foreignerCompatible == "1" ? "Yes" : "No"}/>
                    <ExcelColumn label="Phonenumber" value="displayText"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }
}