import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { setTranslationData } from './actions';
import HeaderPanel from '../../../components/common/HeaderPanel';
import { get } from '../../../scripts/api';
import { toast } from 'react-toastify';
class StatisticsOverview extends React.Component {
   
    componentDidMount() {
        get('statistics', 'getOverview', 
            {},
            result => setStatisticsData(result.content),
            error => {
                toast(`Unable to fetch statistics reports...`);
            }
        )
    }

    render() {
        
        const { statistics } = this.props;
      
        return (
            <div>
                <HeaderPanel title={"Statistics Overview"} />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            {statistics && <OverviewTable data={statistics} />}
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
            statistics: state.statisticsReducer.StatisticsOverview
        }
    }
)(StatisticsOverview);