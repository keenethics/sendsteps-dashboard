import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { setUsersData } from './actions';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
import { post } from '../../../scripts/api';

class DeleteUsersOverview extends React.Component {
   
    componentDidMount() {
        post( 
            'users', 
            'getDeleteUsersOverview', 
            {},
            result => this.props.dispatch(setUsersData(result.content)),
            error => console.log(error)
        )
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