import React from 'react';
import { connect } from 'react-redux';
import { fetchResult, clearAdditionalData } from '../../../actions/api';
import { Panel } from 'react-bootstrap';
import BreadCrumbs from '../../base/BreadCrumbs';
import { Link } from 'react-router-dom';
import ResponseSiteContainer from '../../base/ResponseSiteContainer';
import InputField from '../../../components/common/InputField';
import ColorPickerField from '../../../components/common/ColorPickerField';
import ButtonSwitch from '../../../components/common/ButtonSwitch';
import { isValueInArray } from '../../../scripts/arrayHelper';
import ColorInfo from '../../../components/common/ColorInfo';
import BottomSaveBar from '../../../components/common/BottomSaveBar';

class Settings extends React.Component {

    componentWillMount() {
        let apiController = 'responsesite';
        let apiFunction = 'getSiteList';
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        this.props.dispatch(fetchResult(apiController, apiFunction, apiParams));
    }

    fetchSiteSettings(e) {
        const value = e.target.value;
        if(value && this.props.data && isValueInArray(value, this.props.data.map((item) => item.id))) {
            this.props.dispatch(fetchResult('responsesite', 'getSiteById', JSON.stringify({value}), true));
        } else {
            this.props.dispatch(clearAdditionalData());
        }
    }
    
    render() {
        const { data, additionalData, currentUser } = this.props;
        
        return (
            <div>  
                <Panel>
                    <Panel.Body>
                        <h1>Edit Site Layout</h1> 
                        <hr/>
                        <p>Here you can edit your resonse website layout. If you have more than one response websites coupled to your account, first select the response website which you would like to edit and a preview will be shown.</p>
                        <p>Colors need to be specified as one of the following:</p> 
                        <br/>
                        <ColorInfo />
                    </Panel.Body>
                </Panel>
                <BreadCrumbs urlList={this.props.match.url} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <Panel>
                                <Panel.Body>
                                    <h3>Response Website Layout</h3>
                                    <hr/>
                                    <div className="form-group">
                                        <label>Select a Response Website</label>
                                        <select className="form-control" onChange={this.fetchSiteSettings.bind(this)} value={null} >
                                            <option value={''} >Select...</option>
                                            {data && data.map(item => {
                                                return <option key={item.id} value={item.id}>{item.domain}</option>
                                            })}
                                        </select>
                                    </div>
                                    <hr/>
                                    {additionalData && 
                                    <div>
                                        {currentUser && currentUser.userType === "admin" && 
                                        <span>
                                            <h4>Settings <small className="pull-right"><i>(Superadmin)</i></small></h4>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <InputField 
                                                        clearButton={true}
                                                        leftFaIcon={"globe"}
                                                        labelText={"Domain"}
                                                        placeholder={"Sendc.com"}
                                                        value={additionalData.domain}
                                                    /> 
                                                </div>
                                                <div className="col-md-6">
                                                    <InputField 
                                                        clearButton={true}
                                                        leftFaIcon={"user"}    
                                                        labelText={"User"}
                                                        placeholder={"Sendc.com"}
                                                        value={additionalData.userId}
                                                    /> 
                                                </div>
                                            </div>
                                            <hr/>
                                        </span>}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <InputField 
                                                    clearButton={true}
                                                    leftFaIcon={"pencil-alt"}
                                                    labelText={"Title"}
                                                    placeholder={"Response website title"}
                                                    value={additionalData.title}
                                                /> 
                                            </div>
                                            <div className="col-md-6">
                                                <InputField 
                                                    clearButton={true}
                                                    leftFaIcon={"globe"}
                                                    labelText={"Language"}
                                                    placeholder={"Select Language"}
                                                    value={additionalData.default_language}
                                                /> 
                                            </div>
                                        </div>
                                        <hr/>
                                        <h4>General Components</h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    infoContent={"Color of the loading indicator."}
                                                    labelText={"Loader Color"}
                                                    color={additionalData.loader_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Graph Results Color"}
                                                    color={additionalData.chart_results_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Popup Background Color"}
                                                    color={additionalData.popup_background_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Main Background Color"}
                                                    color={additionalData.body_background_color}
                                                />
                                            </div>
                                        </div>
                                        <hr/>
                                        <h4>Tabs</h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Active Tab Color"}
                                                    color={additionalData.tab_active_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Inactive Tab Color"}
                                                    color={additionalData.tab_inactive_color}
                                                />
                                            </div>
                                        </div>
                                        <hr/>
                                        <h4>Buttons</h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Back Button Background Color"}
                                                    color={additionalData.button_back_background_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Button Background Color"}
                                                    color={additionalData.button_background_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Connect Button Text Color"}
                                                    color={additionalData.connect_button_color}
                                                />
                                            </div>
                                        </div>
                                        <hr/>
                                        <h4>Menu</h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Menu Icon Color"}
                                                    color={additionalData.menu_icon_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Menu Background Color"}
                                                    color={additionalData.menu_background_color}
                                                />
                                            </div>
                                        </div>
                                        <hr/>
                                        <h4>Textfields</h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Text Color"}
                                                    color={additionalData.body_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Answer Background Color"}
                                                    color={additionalData.option_background_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Answer Text Color"}
                                                    color={additionalData.option_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Login Code Background Color"}
                                                    color={additionalData.login_code_background_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Login Code Text Color"}
                                                    color={additionalData.login_code_color}
                                                />
                                            </div>
                                        </div>
                                        <hr/>
                                        <h4>Images</h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Favicon Type</label>
                                                <ButtonSwitch  options={["Image", "URL"]} />
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Logo Alignment</label>
                                                <ButtonSwitch  options={["Left", "Center", "Right"]} />
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                                <InputField 
                                                    clearButton={true}
                                                    leftFaIcon={"text-height"}
                                                    labelText={"Logo Distance From Top"}
                                                    value={additionalData.logo_padding_top}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <InputField
                                                    clearButton={true} 
                                                    leftFaIcon={"link"}
                                                    labelText={"Logo Url"}
                                                    value={additionalData.logo_url}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Logo Url New Tab</label>
                                                <ButtonSwitch />
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Background Type</label>
                                                <ButtonSwitch options={["Image", "URL"]} />
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                <label className="control-label">Background Alignment</label>
                                                <ButtonSwitch options={["Left", "Center", "Right"]} />
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Background Color"}
                                                    color={additionalData.main_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <InputField 
                                                    clearButton={true}
                                                    leftFaIcon={"images"}
                                                    labelText={"Logo Image"}
                                                    value={additionalData.logo_image}
                                                />
                                            </div>
                                        </div>
                                        <hr/>
                                        {currentUser && currentUser.userType === "admin" && 
                                        <span>
                                            <h4>Extra Options <small className="pull-right"><i>(Superadmin)</i></small></h4>
                                                <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Overlay Enabled</label>
                                                        <ButtonSwitch  />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">New Relic</label>
                                                        <ButtonSwitch  />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Analytics</label>
                                                        <ButtonSwitch  />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Contact</label>
                                                        <ButtonSwitch  />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Only Unique Response Codes</label>
                                                        <ButtonSwitch  />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Dark Theme</label>
                                                        <ButtonSwitch  />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <InputField 
                                                            clearButton={true}
                                                            leftFaIcon={"link"}
                                                            labelText={"CDN Url Overwrite"}
                                                            value={additionalData.cdn_url_overwrite}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <InputField 
                                                            clearButton={true}
                                                            leftFaIcon={"arrows-alt-v"}
                                                            labelText={"Header Height"}
                                                            value={additionalData.header_height}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </span>}
                                    </div>}
                                </Panel.Body>
                            </Panel>
                        </div>
                        <ResponseSiteContainer url={additionalData && additionalData.domain} /* Pass selected url, if nothings selected, don't render response site */ />
                    </div>
                    <BottomSaveBar />
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
            additionalData: state.apiReducer.additionalData,
            currentUser: state.authReducer.currentUser
        }
    }
)(Settings);