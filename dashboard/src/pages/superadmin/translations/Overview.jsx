import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { setTranslationData } from './actions';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
class TranslationsOverview extends React.Component {
   
    componentDidMount() {
        this.props.dispatch(fetchResult('translations', 'getOverview', {}, setTranslationData));
    }

    render() {
        
        const { translations } = this.props;
      
        return (
            <div>
                <HeaderPanel title={"Translations Overview"} />
                <div className="container-fluid">
                    <Panel>
                        <Panel.Body>
                            {translations && <OverviewTable data={translations} />}
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
            translations: state.translationReducer.translations
        }
    }
)(TranslationsOverview);