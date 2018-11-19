import React from 'react';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { setDashboardData, setDashboardSettings } from './actions';
import { isValueInArray } from '../../../scripts/arrayHelper';
import { Panel } from 'react-bootstrap';
import BottomSaveBar from '../../../components/common/BottomSaveBar';
import ColorInfo from '../../../components/common/ColorInfo';
import EditDashboardDetails from './Details';
import HeaderPanel from '../../../components/common/HeaderPanel';

class EditDashboardOverview extends React.Component {

    constructor(props) {
        super(props);

        // Handle selected dashboard in state since it's only applicable for the current page.
        this.state = {
            selectedDashboard: null
        }
    }
   
    componentDidMount() {
        this.props.dispatch(
            fetchResult(
                'dashboards', 
                'getOverview', 
                {}, 
                setDashboardData
            )
        );
    }

    fetchDashboardInfo(e) {
        const dashboardId = e.target.value;
        if(this.props.dashboardSites && isValueInArray(dashboardId, this.props.dashboardSites.map((item) => item.id))) {
            this.props.dispatch(
                fetchResult(
                    'dashboards', 
                    'getDetails', 
                    JSON.stringify({dashboardId}),
                    setDashboardSettings
                )
            );
        }
    }

    render() {
        
        const { dashboardSites, dashboardSettings } = this.props;
        const { selectedDashboard } = this.state;

        return (
            <div>
                <HeaderPanel 
                    title={"Edit Dashboard Overview"}
                    content={<span>
                        <p>If you want to overwrite settings for a branded dashboard you can select it from the list below and all known settings will be loaded. If you are not satisfied with the results you can revert to the previous branding styles (this option will be explained later). </p>
                        <p>If you would like to create an entirely new branded dashboard please select the bottom option Or create a new one.</p>
                        <ColorInfo />
                    </span>}
                />
                <div className="container-fluid">
                <Panel>
                    <Panel.Body>
                        <h3>Branded Dashboard Settings</h3>
                        <hr/>
                        <p>These settings are needed for branded dashboards to exists. But not only the branded branded dashboards use these. </p>
                        <p>The Addin is also dependant on these so be careful. <strong>Name</strong> and <strong>Max Free Audience</strong> are not editable once they are set.</p>
                        <p><strong>Dashboard Url</strong> needs to be unique because it is used to load the correct branded dashboard settings.</p>
                        <hr/>
                        <div className="form-group">
                            <label className="control-label">Select a Dashboard</label>
                            <select className="form-control" onChange={this.fetchDashboardInfo.bind(this)} value={selectedDashboard || null} >
                                <option value={null} >Select...</option>
                                {dashboardSites && dashboardSites.map(item => {
                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                })}
                                <option value={-1}>Create New</option>
                            </select>
                        </div>
                        <hr/>
                        {dashboardSettings &&
                        <EditDashboardDetails data={dashboardSettings} />}
                    </Panel.Body>
                </Panel>
                {dashboardSettings &&
                <BottomSaveBar />}
                </div>
            </div>
        
        )
    }
} 

export default connect(
    (state) => {
        return {
            dashboardSites: state.dashboardLayoutReducer.dashboardSites,
            dashboardSettings: state.dashboardLayoutReducer.dashboardSettings,
        }
    }
)(EditDashboardOverview);