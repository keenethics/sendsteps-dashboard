import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';

class DeleteUsersOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(fetchResult('users', 'getDeleteUsersOverview'));
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                <HeaderPanel title={"Delete Users Overview"} />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            {data && <OverviewTable data={data} />}
                        </Panel.Body>
                    </Panel>
                </div>
            </div>
        )
    }
} 

export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
        }
    }
)(DeleteUsersOverview);