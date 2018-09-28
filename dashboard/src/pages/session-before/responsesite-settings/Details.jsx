import React from "react";
import { connect } from 'react-redux';
import { fetchResult } from '../../../actions/api';
import { Panel } from 'react-bootstrap';
import BreadCrumbs from "../../base/BreadCrumbs";
import { Link } from 'react-router-dom';

class Settings extends React.Component {

    
    componentWillMount() {
        let apiController = 'responsesite';
        let apiFunction = 'getSettingsBasic';
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult(apiController, apiFunction, apiParams));
    }
    
    render() {

        const { data, match } = this.props;
        console.log(data)

        return (
            <div>  
                <Panel>
                    <Panel.Body>
                        <h1>Response Website Settings</h1> 
                        <p>
                            On this page you can edit your session details, 
                            for example the way your audience can respond, 
                            via SMS, a [mobile] website or Twitter. 
                            Click on the question marks to learn more about the different functionalities.
                        </p>
                    </Panel.Body>
                </Panel>
                <BreadCrumbs urlList={match.url} />   
                <Panel>
                    <Panel.Body>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-horizontal">
                                    <div className="form-group">
                                        <label className="col-sm-6 control-label">Response Code</label>
                                        <div className="col-sm-6">
                                            <input type="text" value={data && data.textmessagingkeyword} disabled="disabled" className="form-control input-lg" placeholder="" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-6 control-label">Response Website</label>
                                        <div className="col-sm-6">
                                            <input type="text" value={data && data.internetselected} disabled="disabled" className="form-control input-lg" placeholder="" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-6 control-label">URL</label>
                                        <div className="col-sm-6">
                                            {/* responseSitesList */}
                                            {/* <input type="text" value={data && data.textmessagingkeyword} className="form-control input-lg" placeholder="" /> */}
                                        </div>
                                    </div>

                                     <div className="form-group">
                                        <label className="col-sm-6 control-label">TXT/SMS</label>
                                        <div className="col-sm-6">
                                            <input type="text" value={data && data.textmessagingselected} className="form-control input-lg" placeholder="" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-6 control-label">Country</label>
                                        <div className="col-sm-6">
                                            {/* phonenumberCountryisocode */}
                                            {/* countriesList */}
                                            {/* <input type="text" value={data && data.textmessagingkeyword} className="form-control input-lg" placeholder="" /> */}
                                        </div>
                                    </div>

                                     <div className="form-group">
                                        <label className="col-sm-6 control-label">International Audience</label>
                                        <div className="col-sm-6">
                                            <input type="text" value={data && data.phonenumberForeignerCompatible} className="form-control input-lg" placeholder="" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-6 control-label">Phone number</label>
                                        <div className="col-sm-6">
                                            <input type="text" value={data && data.textmessagingkeyword} className="form-control input-lg" placeholder="" />
                                        </div>
                                    </div>
                            
                                    <button type="submit" className="btn btn-default">Send invitation</button>
                                </div>
                            </div>
                        </div>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}


export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
        }
    }
)(Settings);