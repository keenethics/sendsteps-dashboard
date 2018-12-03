import React, { Component } from 'react';
import {ListGroup} from 'react-bootstrap';
import MenuItem from './MenuItem';
import SectionHeader from './SectionHeader';
import MenuProfile from './MenuProfile';
import { connect } from 'react-redux';
import './SideMenu.scss';
import { isSuperAdmin } from '../../scripts/roleHelper';

class SideMenu extends Component {
    render() {

        const { menuOpened, currentUser } = this.props;
        return (
            <div id="sideBar" className={"sideBar" + (menuOpened ? "" : " in")}>
                <ListGroup>
                    <SectionHeader 
                            headerText="My Profile"
                        />
                    <MenuProfile />
                    <SectionHeader 
                        headerText="Before Session"
                    />
                    <MenuItem 
                        menuOpened={menuOpened}
                        menuText="Response Settings"
                        faIconClass="fa-cog"
                        link="/session-before/responsesite-settings"
                    />
                    <MenuItem 
                        menuOpened={menuOpened}
                        menuText="Audience Identification"
                        faIconClass="fa-users"
                        link="/session-before/audience-identification"
                    />
                    <MenuItem 
                        menuOpened={menuOpened}
                        menuText="Survey"
                        faIconClass="fa-tasks"
                        link="/session-before/surveys"
                    />
                    <MenuItem 
                        menuOpened={menuOpened}
                        menuText="Edit Site Layout"
                        faIconClass="fa-magic"
                        link="/session-before/responsesite-layout"
                    />
                    <MenuItem 
                        menuOpened={menuOpened}
                        menuText="Response Website"
                        faIconClass="fa-mobile"
                        link="/session-before/response"
                    />
                    <SectionHeader 
                        headerText="During The Session"
                    />
                    <MenuItem 
                        menuOpened={menuOpened}
                        menuText="Individual Responses"
                        faIconClass="fa-comments"
                        link="/session-during/individual-responses"
                    />
                    <MenuItem 
                        menuOpened={menuOpened}
                        menuText="Message Filter"
                        faIconClass="fa-check"
                        link="/session-during/message-filter"
                    />
                    <SectionHeader 
                        headerText="After Session"
                    />
                    <MenuItem 
                        menuOpened={menuOpened}
                        menuText="Presentation Results"
                        faIconClass="fa-bar-chart"
                        link="/session-results/presentations"
                    />
                    <MenuItem 
                        menuOpened={menuOpened}
                        menuText="Survey Results"
                        faIconClass="fa-tasks"
                        link="/session-results/surveys"
                    />
                    <SectionHeader 
                        headerText="About"
                    />
                    <MenuItem 
                        menuOpened={menuOpened}
                        menuText="How It Works"
                        faIconClass="fa-file-powerpoint-o"
                        link="/about/howitworks"
                    />
                    <MenuItem 
                        menuOpened={menuOpened}
                        menuText="Dashboard"
                        faIconClass="fa-tachometer"
                        link="/about/dashboard"
                    />
                    <MenuItem 
                        menuOpened={menuOpened}
                        menuText="Sendsteps"
                        faIconClass="fa-info-circle"
                        link="/about/sendsteps"
                    />

                    {isSuperAdmin(currentUser) &&
                        <span>
                        <SectionHeader 
                            headerText="Super Admin"
                        />
                        <MenuItem 
                            menuOpened={menuOpened}
                            menuText="Translations"
                            faIconClass="fa-language"
                            link="/superadmin/translations"
                        />
                        <MenuItem 
                            menuOpened={menuOpened}
                            menuText="Edit Dashboard Layout"
                            faIconClass="fa-magic"
                            link="/superadmin/edit-dashboard"
                        />
                        <MenuItem 
                            menuOpened={menuOpened}
                            menuText="Phonenumbers"
                            faIconClass="fa-phone"
                            link="/superadmin/phonenumbers"
                        />
                        <MenuItem 
                            menuOpened={menuOpened}
                            menuText="Session Overview"
                            faIconClass="fa-envelope"
                            link="/superadmin/sessions"
                        />
                        <MenuItem 
                            menuOpened={menuOpened}
                            menuText="Delete Users"
                            faIconClass="fa-trash"
                            link="/superadmin/delete-users"
                        />
                        </span>}
                </ListGroup>
            </div>
        )
    }
}
export default connect(
    (state) => {
        return {
            menuOpened: state.appReducer.menuOpened,
            currentUser: state.authReducer.currentUser
        }
    }
) (SideMenu);