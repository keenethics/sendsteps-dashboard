import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
class TranslationsOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(fetchResult('translations', 'getOverview'));
    }

    render() {
        
        const { data } = this.props;
      
        return (
            <div>
                <HeaderPanel title={"Translations Overview"} />
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
)(TranslationsOverview);