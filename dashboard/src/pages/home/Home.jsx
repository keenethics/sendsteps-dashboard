import React from "react";
import HeaderPanel from "../../components/common/HeaderPanel";
import { Panel } from 'react-bootstrap'
import LastSessionPanel from "./panels/LastSessionPanel";
import LastWeekPanel from "./panels/LastWeekPanel";
import LastMonthPanel from "./panels/LastMonthPanel";
import LastYearPanel from "./panels/LastYearPanel";
export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
        	<HeaderPanel 
				title={"Dashboard"} 
			/>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12">
						<div className="row">
							<div className="col-xs-3">
								<LastSessionPanel />
							</div>
							<div className="col-xs-3">
								<LastWeekPanel />
							</div>
							<div className="col-xs-3">
								<LastMonthPanel />
							</div>
							<div className="col-xs-3">
								<LastYearPanel />
							</div>
							<div className="col-xs-3">
								<Panel>
									<Panel.Heading>
										<h5>Top 5 active users</h5>
										</Panel.Heading>
									<Panel.Body></Panel.Body>
								</Panel>
							</div>
							<div className="col-xs-3">
								<Panel>
									<Panel.Heading>
										<h5>Invite a colleague</h5>
									</Panel.Heading>
									<Panel.Body></Panel.Body>
								</Panel>
							</div>
						</div>
					</div>
      			</div>
	  		</div>
	  	</div>
	</div>);
  	}
}