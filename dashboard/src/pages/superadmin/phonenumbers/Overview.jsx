import * as React from 'react'; 
import OverviewTable from './OverviewTable';
import { connect } from 'react-redux';
import { setPhonenumberData } from './actions';
import HeaderPanel from '../../../components/common/HeaderPanel';
import './Overview.scss';
import { post } from '../../../scripts/api';
class PhonenumbersOverview extends React.Component {
   
    componentDidMount() {
        post(
            'phonenumbers', 'getOverview', {},
            result => this.props.dispatch(setPhonenumberData(result.content)),
            error => console.log(error)
        )
    }

    render() {
        
        const { phonenumbers } = this.props;
      
        return (
            <div>
                <HeaderPanel title={"Phonenumber Overview"} />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            {phonenumbers && <OverviewTable data={phonenumbers} />}
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
            phonenumbers: state.phonenumberReducer.phonenumbers,
        }
    }
)(PhonenumbersOverview);