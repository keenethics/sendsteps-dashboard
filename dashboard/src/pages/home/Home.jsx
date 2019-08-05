import React from 'react';
import { connect } from 'react-redux';
import HeaderPanel from '../../components/common/HeaderPanel';
import StatisticPanelContainer from './panels/StatisticPanelContainer';
import { post } from '../../scripts/api';

class Home extends React.Component {
  componentDidMount() {
    const id = this.props.currentUser.userId;

    post(
      '',
      'checkGuidedTour',
      { id },
      ({ isGuidedTourTake }) => {
        if (!isGuidedTourTake) {
          const result = confirm('Hello! Take guided tour?');
          if (result) {
            post(
              '',
              'takeGuidedTour',
              { id },
              () => alert('Guided tour!'),
              error => alert(`Fail: ${error}`)
            );
          }
        }
      },
      error => console.log(`Cant check guided tour: ${JSON.stringify(error)}`)
    );
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <HeaderPanel
            title={'Dashboard'}
            content={<h4>How many responses did your Sendsteps license receive?</h4>}
          />
          <div className="container-fluid">
            <div className="row">
              <StatisticPanelContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    currentUser: state.authReducer.currentUser
  };
})(Home);
