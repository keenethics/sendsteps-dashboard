import Particles from 'react-particles-js';
import React, { Component } from 'react';
import Details from './Details';
import { connect } from 'react-redux';
import SendstepsLogo from './SendstepsLogo';
import { particleJSParams } from '../../scripts/particleJSParams';
import './DetailsContainer.scss';
class DetailsContainer extends Component {
  
    render(){

		const { securityError } = this.props;

		return (
			<div>
				{securityError && <div className="security-error"><p><i className="fa fa-exclamation-triangle"></i> {securityError}</p></div>}
				
				<Particles 
					className="particles"
					width={document.body.clientWidth} 
					height={document.body.clientHeight} 
					params={particleJSParams()} 
				/>
				<SendstepsLogo />
				<Details />
			</div>
		)
    };
}

export default connect(
  (state) => {
    return {
      securityError: state.authReducer.securityError
    }
  }
) (DetailsContainer);