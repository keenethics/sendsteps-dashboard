import React from 'react';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class ExcelView extends React.Component {
    render() {

        const { data } = this.props;
        const excelButton = <button className="btn btn-sm btn-success"><i className="fa fa-file-excel"></i> Download Excel (.xlsx)</button>
        
        console.log(data);
        return (
            <ExcelFile element={excelButton} className="btn btn-primary" filename="phonenumbers">
                <ExcelSheet data={data} name="Phonenumbers">
                    <ExcelColumn label="Country" value={(col) => col.name + " (" + col.isoCode + ")"} />
                    <ExcelColumn label="Phonenumber" value="displayText"/>
                    <ExcelColumn label="International" value={(col) => col.foreignerCompatible === "1" ? "Yes" : "No"}/>
                    <ExcelColumn label="Public" value={(col) => col.public === "1" ? "Yes" : "No"}/>
                </ExcelSheet>
            </ExcelFile>
        );
    }
}