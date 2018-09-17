import React from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import BaseTable from '../../base/BaseTable';
import { connect } from 'react-redux';

class OverviewTable extends BaseTable {

    constructor(props) {
        super(props);

        this.state = {
            selectedDashboard: null
        }
    }

    selectDashboardToEdit(e) {
        this.setState({selectedDashboard: e.target.value});
        // this.props.dispatch(selectDashboardToEdit(e.target.value))
    }

    render() {
        const { data } = this.props;

        const { selectedDashboard } = this.state;

        console.log(selectedDashboard);

        return (
            <div>
                <div className="form-group">
                    <label >Select a branded dashboard to edit:</label>
                    <select className="form-control" onChange={this.selectDashboardToEdit.bind(this)} value={selectedDashboard || null} >
                        <option value={null} >Select...</option>
                        {data && data.map(item => {
                            return <option key={item.id} value={item.name}>{item.name}</option>
                        })}
                    </select>
                </div>

                {selectedDashboard &&
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <h3>General Settings</h3>
                                <p>
                                    These settings are needed for branded dashboards to exists. 
                                    But not only the branded branded dashboards use these. 
                                    The Addin is also dependant on these so be careful. 
                                    Name and Max Free Audience Size are not editable once they are set.  
                                    Dashboard Url needs to be unique because it is used to load the correct branded dashboard settings.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input className="form-control" />
                                </div>
                            </div>
                            
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Response website URL</label>
                                    <input className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Twitter Hashtag</label>
                                    <input className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>User Opinions Contact</label>
                                    <input className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            // selectedDashboard: state.dataReducer.selectedDashboard
        }
    }
)(OverviewTable);