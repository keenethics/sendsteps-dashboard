import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult, clearData } from '../../../actions/api';
import BreadCrumbs from '../../../pages/base/BreadCrumbs';
import { Panel } from 'react-bootstrap';

class DeleteUsersOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(fetchResult('users', 'getDeleteUsersOverview'));
    }

    componentWillUnmount() {
        this.props.dispatch(clearData());
    }

    render() {
        const { data, match } = this.props;
        console.log(data);
        return (
            <div>
                <Panel>
                    <Panel.Body>
                        <h1>Delete Users Overview</h1>   
                    </Panel.Body>
                </Panel>
                <BreadCrumbs urlList={match.url} />
                <Panel>
                    <Panel.Body>
                        <div className="container-fluid">
                            {data && <OverviewTable data={data} />}
                        </div>
                    </Panel.Body>
                </Panel>
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