import React, { Component } from 'react';
import {ListGroup} from 'react-bootstrap';
import MenuItem from './MenuItem';
import SectionHeader from './SectionHeader';
import { connect } from 'react-redux';

class SideMenu extends Component {
    render() {
        return (
            <div className={"sideBar" + (this.props.menuOpened ? "" : " in")}>
                <ListGroup>
                    <SectionHeader 
                        headerText="Before Session"
                    />
                    <MenuItem 
                        menuText="Response Settings"
                        faIconClass="fa-cog"
                        link="/settings"
                    />
                    <MenuItem 
                        menuText="Audience Identification"
                        faIconClass="fa-users"
                        link="/"
                    />
                    <MenuItem 
                        menuText="Survey"
                        faIconClass="fa-tasks"
                        link="/"
                    />
                    <MenuItem 
                        menuText="Edit Site Layout"
                        faIconClass="fa-magic"
                        link="/"
                    />
                    <MenuItem 
                        menuText="Response Website"
                        faIconClass="fa-mobile"
                        link="/"
                    />
                    <SectionHeader 
                        headerText="During The Session"
                    />
                    <MenuItem 
                        menuText="Individual Responses"
                        faIconClass="fa-comments"
                        link="/"
                    />
                    <MenuItem 
                        menuText="Message Filter"
                        faIconClass="fa-check"
                        link="/"
                    />
                    <SectionHeader 
                        headerText="After Session"
                    />
                    <MenuItem 
                        menuText="Presentation Results"
                        faIconClass="fa-chart-bar"
                        link="/"
                    />
                    <MenuItem 
                        menuText="Survey Results"
                        faIconClass="fa-tasks"
                        link="/settings"
                    />
                    <SectionHeader 
                        headerText="About"
                    />
                    <MenuItem 
                        menuText="How It Works"
                        faIconClass="fa-file-powerpoint"
                        link="/about/howitworks"
                    />
                    <MenuItem 
                        menuText="Dashboard"
                        faIconClass="fa-tachometer-alt"
                        link="/about/dashboard"
                    />
                    <MenuItem 
                        menuText="Sendsteps"
                        faIconClass="fa-info-circle"
                        link="/about/sendsteps"
                    />
                    <SectionHeader 
                        headerText="Super Admin"
                    />
                    <MenuItem 
                        menuText="Translations"
                        faIconClass="fa-language"
                        link="/"
                    />
                    <MenuItem 
                        menuText="Edit Dashboard Layout"
                        faIconClass="fa-magic"
                        link="/"
                    />
                    <MenuItem 
                        menuText="Phonenumbers"
                        faIconClass="fa-phone"
                        link="/phonenumbers"
                    />
                    <MenuItem 
                        menuText="Session Overview"
                        faIconClass="fa-envelope"
                        link="/sessions"
                    />
                    <MenuItem 
                        menuText="Delete Users"
                        faIconClass="fa-trash"
                        link="/"
                    />
                </ListGroup>
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            menuOpened: state.appReducer.menuOpened
        }
    }
) (SideMenu);