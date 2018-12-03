import React from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import ResponseSiteContainer from '../../base/ResponseSiteContainer';
import InputField from '../../../components/common/InputField';
import ColorPickerField from '../../../components/common/ColorPickerField';
import ButtonSwitch from '../../../components/common/ButtonSwitch';
import { isValueInArray } from '../../../scripts/arrayHelper';
import ColorInfo from '../../../components/common/ColorInfo';
import BottomSaveBar from '../../../components/common/BottomSaveBar';
import HeaderPanel from '../../../components/common/HeaderPanel';
import { setResponseSettings, setLayoutSettings } from './actions';
import { post } from '../../../scripts/api';
import { toast } from 'react-toastify';

class LayoutOverview extends React.Component {

    componentDidMount() {
        post('responsesite', 'getSiteList', 
            JSON.stringify({
                id: this.props.match.params.id
            }),
            result => {
                console.log(result);
                this.props.dispatch(setResponseSettings(result.content));
            },
            error => {
                toast(`Unable to load responsesites... [${error}]`)
            }
        )
    }

    fetchSiteSettings(e) {
        const value = e.target.value;
        if(value && this.props.responseSites && isValueInArray(value, this.props.responseSites.map((item) => item.id))) {
            post('responsesite', 'getSiteById', 
                JSON.stringify({value}), 
                result => {
                    console.log(result);
                    this.props.dispatch(setLayoutSettings(result.content))
                },
                error => {
                    toast(`Unable to load site settings... [${error}]`)
                }
            )
        }
    }
    
    render() {
        const { responseSites, responseSettings, currentUser } = this.props;
        
        return (
            <div>  
                <HeaderPanel 
                    title={"Edit Site Layout"}
                    content={<span>
                        <p>Here you can edit your resonse website layout. If you have more than one response websites coupled to your account, first select the response website which you would like to edit and a preview will be shown.</p>
                        <p>Colors need to be specified as one of the following:</p> 
                        <br/>
                        <ColorInfo />
                    </span>}
                />
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
                                            {responseSites && responseSites.map(item => {
                                                return <option key={item.id} value={item.id}>{item.domain}</option>
                                            })}
                                        </select>
                                    </div>
                                    <hr/>
                                    {responseSettings && 
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
                                                        value={responseSettings.domain}
                                                    /> 
                                                </div>
                                                <div className="col-md-6">
                                                    <InputField 
                                                        clearButton={true}
                                                        leftFaIcon={"user"}    
                                                        labelText={"User"}
                                                        placeholder={"Sendc.com"}
                                                        value={responseSettings.userId}
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
                                                    value={responseSettings.title}
                                                /> 
                                            </div>
                                            <div className="col-md-6">
                                                <InputField 
                                                    clearButton={true}
                                                    leftFaIcon={"globe"}
                                                    labelText={"Language"}
                                                    placeholder={"Select Language"}
                                                    value={responseSettings.default_language}
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
                                                    color={responseSettings.loader_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Graph Results Color"}
                                                    color={responseSettings.chart_results_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Popup Background Color"}
                                                    color={responseSettings.popup_background_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Main Background Color"}
                                                    color={responseSettings.body_background_color}
                                                />
                                            </div>
                                        </div>
                                        <hr/>
                                        <h4>Tabs</h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Active Tab Color"}
                                                    color={responseSettings.tab_active_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Inactive Tab Color"}
                                                    color={responseSettings.tab_inactive_color}
                                                />
                                            </div>
                                        </div>
                                        <hr/>
                                        <h4>Buttons</h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Back Button Background Color"}
                                                    color={responseSettings.button_back_background_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Button Background Color"}
                                                    color={responseSettings.button_background_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Connect Button Text Color"}
                                                    color={responseSettings.connect_button_color}
                                                />
                                            </div>
                                        </div>
                                        <hr/>
                                        <h4>Menu</h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Menu Icon Color"}
                                                    color={responseSettings.menu_icon_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Menu Background Color"}
                                                    color={responseSettings.menu_background_color}
                                                />
                                            </div>
                                        </div>
                                        <hr/>
                                        <h4>Textfields</h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Text Color"}
                                                    color={responseSettings.body_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Answer Background Color"}
                                                    color={responseSettings.option_background_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Answer Text Color"}
                                                    color={responseSettings.option_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Login Code Background Color"}
                                                    color={responseSettings.login_code_background_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <ColorPickerField 
                                                    labelText={"Login Code Text Color"}
                                                    color={responseSettings.login_code_color}
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
                                                    value={responseSettings.logo_padding_top}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <InputField
                                                    clearButton={true} 
                                                    leftFaIcon={"link"}
                                                    labelText={"Logo Url"}
                                                    value={responseSettings.logo_url}
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
                                                    color={responseSettings.main_color}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <InputField 
                                                    clearButton={true}
                                                    leftFaIcon={"images"}
                                                    labelText={"Logo Image"}
                                                    value={responseSettings.logo_image}
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
                                                            value={responseSettings.cdn_url_overwrite}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <InputField 
                                                            clearButton={true}
                                                            leftFaIcon={"arrows-alt-v"}
                                                            labelText={"Header Height"}
                                                            value={responseSettings.header_height}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </span>}
                                    </div>}
                                </Panel.Body>
                            </Panel>
                        </div>
                        <ResponseSiteContainer url={responseSettings && responseSettings.domain} /* Pass selected url, if nothings selected, don't render response site */ />
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
            responseSites: state.siteLayoutReducer.responseSites,
            responseSettings: state.siteLayoutReducer.responseSettings,
            currentUser: state.authReducer.currentUser
        }
    }
)(LayoutOverview);