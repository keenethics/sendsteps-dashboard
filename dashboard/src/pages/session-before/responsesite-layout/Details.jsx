import React from 'react';
import { connect } from 'react-redux';
import { fetchResult, clearAdditionalData } from '../../../actions/api';
import { Panel } from 'react-bootstrap';
import BreadCrumbs from '../../base/BreadCrumbs';
import { Link } from 'react-router-dom';
import ResponseSiteContainer from '../../base/ResponseSiteContainer';

class Settings extends React.Component {

    componentWillMount() {
        let apiController = 'responsesite';
        let apiFunction = 'getSiteList';
        let apiParams = JSON.stringify({
            id: this.props.match.params.id
        });
        
        // //Get site with ID 73
        // let apiController = 'responsesite';
        // let apiFunction = 'getSiteById';
        // let apiParams = JSON.stringify({
        //     id: 73
        // });
        this.props.dispatch(fetchResult(apiController, apiFunction, apiParams));
    }

    fetchSiteSettings(id) {
        if(this.props.data) {
            const keyList = this.props.data.map((item) => item.id);
            if(keyList.indexOf(id) > -1) {
                this.props.dispatch(fetchResult('responsesite', 'getSiteById', JSON.stringify({id}), true));
            }
        }

    }

    selectSiteToEdit(e) {
        if(e.target.value) {
            this.fetchSiteSettings(e.target.value);
        } else {
            this.props.dispatch(clearAdditionalData());
        }
        // Call api with settings for said response site
    }
    
    render() {
        const { data, additionalData } = this.props;

        console.log(data);
        
        return (
            <div>  
                <Panel>
                    <Panel.Body>
                        <h1>Edit Site Layout</h1> 
                        <hr/>
                        <p>Here you can edit your resonse website layout. If you have more than one response websites coupled to your account, first select the response website which you would like to edit and a preview will be shown.</p>
                        <p>Colors need to be specified as one of the following:</p> 
                        <br/>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2">
                                        <p><strong>Hexadecimal</strong> </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p>(e.g. <code>#fd6400</code>)</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        <p><strong>RGBA</strong> </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p>(e.g. <code>rgba(21, 0, 255, 0.57)</code>)</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        <p><strong>HSLA</strong> </p>
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <p>(e.g. <code>hsla(245, 100%, 50%, 0.57)</code>)</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        <p><strong>RGB</strong> </p>
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <p>(e.g. <code>rgb(21, 0, 255)</code>)</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        <p><strong>HSL</strong> </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p>(e.g. <code>hsl(245, 100%, 50%)</code></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Panel.Body>
                </Panel>
                <BreadCrumbs urlList={this.props.match.url} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <Panel>
                                <Panel.Body>
                                    <h3>Response Website Settings</h3>
                                    <hr/>
                                    <div className="form-group">
                                        <label>Select a Response Website</label>
                                        <select className="form-control" onChange={this.selectSiteToEdit.bind(this)} value={null} >
                                            <option value={''} >Select...</option>
                                            {data && data.map(item => {
                                                return <option key={item.id} value={item.id}>{item.domain}</option>
                                            })}
                                        </select>
                                    </div>
                                    <hr/>

                                    {additionalData && 
                                    <div>
                                        Domain: {additionalData.domain}
                                        UserId: {additionalData.user_id}   
                                            {/* 

                                            These are the fields on the current dashboard

                                            -- Normal -- 

                                            -- Super Admin --
                                            
                                            Domain                      domain
                                            User

                                            -- 

                                            Title
                                            Language
                                            Logo Image
                                            Main Background Color
                                            Text Color
                                            Answer Background Color
                                            Answer Text Color
                                            Button Background Color

                                            -- Advanced --

                                            Login Code Background Color
                                            Back Button Background Color
                                            Logo Alignment
                                            Logo Distance From Top
                                            Header Height
                                            Logo Url

                                            Logo Url New Tab

                                            Active Tab Color
                                            Inactive Tab Color
                                            Loader Color
                                            Graph Results Color

                                            Connect Button Text Color
                                            Login Code Text Color
                                            Popup Backgorund Color
                                            Menu Icon Color
                                            Menu Background Color

                                            Background Type
                                            Background Alignment (if img)       background_position: "left"
                                            Background Color

                                            Favicon Type
                                            Favicon URL

                                            -- Super Admin --

                                            Overlay Enabled
                                            No New Relic
                                            No Analytics
                                            No Contact
                                            CDN Url Overwrite


                                            So these all have to be mapped.

                                            'domain' => 'Domain',
                                            'user_id' => 'User',
                                            'account_id' => 'User',
                                            'default_language' => 'Language',
                                            'body_background_color' => 'Main Background Color',
                                            'body_color' => 'Text Color',
                                            'option_background_color' => 'Answer Background Color',
                                            'option_color' => 'Answer Text Color',
                                            'button_back_background_color' => 'Back Button Background Color',
                                            'logo_align' => 'Logo Alignment',
                                            'logo_padding_top' => 'Logo Distance from Top',
                                            'tab_active_color' => 'Active Tab Color',
                                            'tab_inactive_color' => 'Inactive Tab Color',
                                            'loader_color' => 'Loader Color',
                                            'main_background_type' => 'Background Type',
                                            'main_color' => 'Background Color',
                                            'switch_off_new_relic' => 'No New Relic',
                                            'switch_off_analytics' => 'No Analytics',
                                            'switch_off_contact' => 'No Contact',
                                            'dark_sst_logo' => 'Shaded Logo',
                                            'enable_overlay' => 'Overlay Enabled',
                                            'menu_background_color' => 'Menu Background Color',
                                            'menu_icon_color' => 'Menu Icon Color',
                                            'background_position' => 'Background Alignment',
                                            'chart_results_color' => 'Graph Results Color',
                                            'connect_button_color' => 'Connect Button Text Color',
                                            'login_code_color' => 'Login Code Text Color',
                                            'popup_background_color' => 'Popup Background Color'

                                            account_id: "1"
                                            background_position: "left"
                                            body_background_color: "#ff00ff"
                                            body_color: "#0c343d"
                                            button_back_background_color: ""
                                            button_back_color: ""
                                            button_background_color: ""
                                            button_color: ""
                                            cdn_url_overwrite: ""
                                            chart_results_color: null
                                            connect_button_color: null
                                            css_url: "https://dev-sendc.scdn1.secure.raxcdn.com/response/1-2018_28_08_12_47-h-iI3a1yvvhW.css"
                                            dark_sst_logo: "0"
                                            default_language: "nl"
                                            domain: "test.com"
                                            enable_overlay: "0"
                                            favicon_image_url: null
                                            favicon_type: "url"
                                            favicon_url: ""
                                            footer_background_color: ""
                                            header_height: null
                                            id: "74"
                                            isDeleted: "0"
                                            loader_color: null
                                            login_code_background_color: ""
                                            login_code_color: null
                                            logo_align: "center"
                                            logo_image_url: null
                                            logo_image_url2x: null
                                            logo_image_x: null
                                            logo_image_y: null
                                            logo_padding_top: null
                                            logo_url: ""
                                            logo_url_new_tab: "0"
                                            main_background_type: "image"
                                            main_color: ""
                                            main_image_url: null
                                            menu_background_color: null
                                            menu_icon_color: null
                                            option_background_color: ""
                                            option_chosen_background_color: ""
                                            option_chosen_color: ""
                                            option_color: ""
                                            overlay_image: null
                                            popup_background_color: null
                                            switch_off_analytics: "0"
                                            switch_off_contact: "0"
                                            switch_off_new_relic: "0"
                                            tab_active_color: ""
                                            tab_inactive_color: ""
                                            text_background_color: ""
                                            text_color: ""
                                            text_placeholder_color: ""
                                            title: null
                                            unique_response_codes_only: "1"
                                            user_id: "1"
                                            white_label: "0"
                                            
                                            
                                            */}
                                    </div>}
                                </Panel.Body>
                            </Panel>
                        </div>
                        <ResponseSiteContainer url={additionalData && additionalData.domain} /* Pass selected url, if nothings selected, don't render response site */ />
                    </div>
                    <Panel>
                        <Panel.Body>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <button type='button' id='save-btn' className='btn btn-success pull-right'><i className="fa fa-floppy-o"></i> Save
                                            </button>
                                            <Link to="/">
                                                <button type='button' id='back-btn' className='btn btn-default'><i className="fa fa-chevron-left"></i> Back
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Panel.Body>
                    </Panel>
                </div>
                
                
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            data: state.apiReducer.data,
            additionalData: state.apiReducer.additionalData
        }
    }
)(Settings);