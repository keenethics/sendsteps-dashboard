import React, { Component } from 'react';
import { formatCompanyColors } from '../../../scripts/colorHelper';
import InputField from '../../../components/common/InputField';
import ColorPickerField from '../../../components/common/ColorPickerField';
import ButtonSwitch from '../../../components/common/ButtonSwitch';
import ImageUploadField from '../../../components/common/ImageUploadField';

class EditDashboardDetails extends Component {
    render() {

        const { data } = this.props;
        
        return (
            <span>
                <h4>General Settings</h4>
                <p>If you want to overwrite settings for a branded dashboard you can select it from the list below and all known settings will be loaded. If you are not satisfied with the results you can revert to the previous branding styles (this option will be explained later). </p>
                <p>If you would like to create an entirely new branded dashboard please select the bottom option Or create a new one.</p>
                <hr/>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <InputField
                                leftFaIcon={"font"}
                                labelText="Name"
                                value={data.name}
                                readonly={true}
                            />                                    
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <InputField
                                leftFaIcon={"link"}
                                labelText="Response Website Url"
                                value={data.websiteAddress}
                            />                                    
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <InputField
                                leftFaIcon={"hashtag"}
                                labelText="Twitter Hashtag"
                                value={data.twitterAddress}
                            />                                    
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <InputField
                                leftFaIcon={"envelope"}
                                labelText="User Opinions Contact"
                                value={data.userOpinionsContact}
                            />                                    
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <InputField
                                leftFaIcon={"link"}
                                labelText="Dashboard URL"
                                value={data.dashboardUrl}
                            />                                    
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <InputField
                                leftFaIcon={"envelope"}
                                labelText="Contact Email"
                                value={data.email}
                            />                                    
                        </div>
                    </div>
                    
                    <div className="col-md-3">
                        <div className="form-group">
                            <InputField
                                leftFaIcon={"envelope"}
                                labelText="Owner (Dropdown)"
                                value={data.ownerId}
                            />                                    
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <InputField
                                leftFaIcon={"users"}
                                labelText="Max. Free Audience"
                                value={data.ownerId}
                                readonly={true}
                            />                                    
                        </div>
                    </div>
                </div>
                <hr/>
                <h4>Main Company Colors</h4>
                <p>These colors need to be specified as Hexadecimal (e.g. <code>#fd6400</code>) values. They are used for the wordcloud and the four info tiles shown on the dashboard homepage.</p>
                <hr/>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField 
                                labelText={"Company Color #1"}
                                color={formatCompanyColors(data.baseColors, 0)}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField 
                                labelText={"Company Color #2"}
                                color={formatCompanyColors(data.baseColors, 1)}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField 
                                labelText={"Company Color #3"}
                                color={formatCompanyColors(data.baseColors, 2)}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField 
                                labelText={"Company Color #4"}
                                color={formatCompanyColors(data.baseColors, 3)}
                            />
                        </div>
                    </div>
                </div>
                <hr/>
                <h4>Old vs New</h4>
                <p>If you are not satisfied with the results you can revert to the previously set branding - the old way/familiar to clients - also known as file-based branding.</p>
                <p>To do this select the Use File Based Branding-checkbox. This only works if there is a previous file based branding available. If this is not available setting this checkbox will result in the dashboard using default Sendsteps branding instead, until you uncheck this checkbox.</p>
                <hr/>
                <div className="row">
                    <div className="col-md-3">
                        <label className="control-label">Select Branding type</label>
                        <ButtonSwitch options={["File based", "Default"]}/>
                    </div>
                </div>
                <hr/>
                <h4>Images</h4>
                <p>If you would like to use a Logo Image as is (without scaling it down to the required sizes) you should select the 'Use As Is' option in combination with a freshly selected Logo Image.</p>
                <p>Favicon Zip requires the zip file which you get from <a href="//realfavicongenerator.net">RealFaviconGenerator</a>. When you generate the realfavicongenerator zip you will be asked for Favicon Generator Options->Path. Here you select I cannot or I do not want to place favicon files at the root of my web site. Instead I will place them here: and you set the field to some internet address, for example https://www.sendsteps.com/ or https://dev-sendc.scdn1.secure.raxcdn.com/dashboard/. This will make all favicon links absolute urls. These absolute urls will be overwritten with the correct ones once you click save.</p>
                <hr/>
                <div className="row">
                    <ImageUploadField 
                        colWidth={6}
                        labelText={"Logo Image"}
                    />
                    <ImageUploadField 
                        colWidth={6}
                        labelText={"Favicon Zip"}
                    />
                </div>
                
                <div className="row">
                    <div className="col-md-6">
                        <label className="control-label">Logo resizing</label>
                        <ButtonSwitch options={["Use As Is", "Auto"]} />
                    </div>
                </div>
                <hr/>
                <h4>Login page colors</h4>
                <p><strong>Login Background Blend Color</strong> is not required but allows you to change the color of the standard gray login background image.</p> 
                <p>If you don't know what this means, select one of the main colors and choose blend mode normal. </p>
                <p>For <strong>Login Background Blend Color</strong> you can use 1 of 5 different <strong>Login Background Blend Types</strong>. Be warned that overlay, multiply, screen and color burn take extra time as they are not natively supported. </p>
                <p>Perhaps first set all all other options, save, and then continue with the this set of options. You can always change the login background color as much as you like.</p>
                <hr/>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField 
                                labelText={"Login Background Blend Color"}
                                color={data.loginBackgroundBlendColor}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="control-label">Login Background Blend Type</label>
                        <ButtonSwitch selected={data.loginBackgroundBlendType} options={["Normal", "Overlay", "Multiply", "Screen", "Color Burn"]} />
                    </div>
            
                </div>
                <hr/>
                <h4>Top- and sidebar colors</h4>
                <p>The toggle sidebar button in the top left corner consists of an image who'scolors are derived from Topbar Text Color. The image will be automatically generated for you.</p>
                <hr/>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Topbar Text Color"}
                                color={data.topbarTextColor}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Topbar Background Color"}
                                color={data.topbarBackgroundColor}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Sidebar Section Text Color"}
                                color={data.sidebarSectionTextColor}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Sidebar Active Text Color"}
                                color={data.sidebarMenuActiveTextColor}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Sidebar Active Background Color"}
                                color={data.sidebarMenuActiveBackgroundColor}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Sidebar Text Color"}
                                color={data.sidebarTextColor}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Sidebar Background Color"}
                                color={data.sidebarBackgroundColor}
                            />
                        </div>
                    </div>
                </div>
                <hr/>
                <h4>Content colors</h4>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Text Color"}
                                color={data.textColor}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"General Heading Color"}
                                color={data.generalHeadingColor}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Page Heading Heading Color"}
                                color={data.pageHeadingHeadingColor}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Panel Heading Color"}
                                color={data.panelHeadingColor}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Default Btn Background Color"}
                                color={data.defaultBtnBackgroundColor}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Primary Btn Background Color"}
                                color={data.primaryBtnBackgroundColor}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Inverse Btn Background Color"}
                                color={data.inverseBtnBackgroundColor}
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <ColorPickerField
                                labelText={"Alt Midnightblue Btn Background Color"}
                                color={data.altMidnightblueBtnBackgroundColor}
                            />
                        </div>
                    </div>
                </div>
            </span>
        )
    }
}

export default EditDashboardDetails;