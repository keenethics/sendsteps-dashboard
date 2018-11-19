import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { setUsersData } from './actions';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';

class DeleteUsersOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(
            fetchResult(
                'users', 
                'getDeleteUsersOverview', 
                {}, 
                setUsersData
            )
        );
    }

    render() {
        const { userList } = this.props;
        return (
            <div>
                <HeaderPanel title={"Delete Users Overview"} />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            {userList && <OverviewTable data={userList} />}
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
            userList: state.userManageReducer.userList,
        }
    }
)(DeleteUsersOverview);