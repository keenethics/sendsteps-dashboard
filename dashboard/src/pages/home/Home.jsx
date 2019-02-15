import React from "react";
import HeaderPanel from "../../components/common/HeaderPanel";
import StatisticPanelContainer from "./panels/StatisticPanelContainer";
export default class Home extends React.Component {
  	render() {
    	return (
			<div className="Home">
				<div className="lander">
					<HeaderPanel 
						title={"Dashboard"} 
						content={<h4>
							How many responses did your Sendsteps license receive?
						</h4>}
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