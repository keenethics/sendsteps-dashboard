import Particles from 'react-particles-js';
import React, { Component } from 'react';
import Details from './Details';
import SendstepsLogo from './SendstepsLogo';
import { connect } from 'react-redux';
import { particleJSParams } from '../../scripts/particleJSParams';
class DetailsContainer extends Component {
  
    render(){

		const { securityError } = this.props;

		return (
			<div>
				<SendstepsLogo />
				{securityError && <div className="security-error"><p><i className="fa fa-exclamation-triangle"></i> {securityError}</p></div>}
				<Particles 
					className="particles"
					width={document.body.clientWidth} 
					height={document.body.clientHeight} 
					params={particleJSParams()} 
				/>
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