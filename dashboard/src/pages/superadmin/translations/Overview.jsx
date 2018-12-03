import React from 'react';
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { setTranslationData } from './actions';
import { Panel } from 'react-bootstrap';
import HeaderPanel from '../../../components/common/HeaderPanel';
import { get } from '../../../scripts/api';
import { toast } from 'react-toastify';
class TranslationsOverview extends React.Component {
   
    componentDidMount() {
        get('translations', 'getOverview', 
            {},
            result => setTranslationData(result.content),
            error => {
                toast(`Unable to fetch translations...`);
            }
        )
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