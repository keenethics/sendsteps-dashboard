import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { setPhonenumberData } from './actions';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
import './Overview.scss';
class PhonenumbersOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(fetchResult('phonenumbers', 'getOverview', {}, setPhonenumberData));
    }

    render() {
        
        const { phonenumbers } = this.props;
      
        return (
            <div>
                <HeaderPanel title={"Phonenumber Overview"} />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            {phonenumbers && <OverviewTable data={phonenumbers} />}
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
            phonenumbers: state.phonenumberReducer.phonenumbers,
        }
    }
)(PhonenumbersOverview);