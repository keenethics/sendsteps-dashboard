import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult, clearData } from '../../../actions/api';
import BreadCrumbs from '../../../pages/base/BreadCrumbs';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
class TranslationsOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(fetchResult('translations', 'getOverview'));
    }

    componentWillUnmount() {
        this.props.dispatch(clearData());
    }

    render() {
        
        const { data, match } = this.props;
      
        return (
            <div>
                <HeaderPanel
                    title={"Translations Overview"}
                />
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
)(TranslationsOverview);