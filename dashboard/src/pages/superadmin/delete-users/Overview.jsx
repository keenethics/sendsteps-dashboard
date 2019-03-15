import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { setUsersData } from './actions';
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
                    <div className="card">
                        <div className="card-body">
                            {userList && <OverviewTable data={userList} />}
                        </div>
                    </div>
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