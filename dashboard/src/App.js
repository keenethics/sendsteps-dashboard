import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";

  
class App extends Component {
    toggleSideBar(){
        let sideBar = document.getElementsByClassName('sideBar')[0];
        console.log(document.getElementsByClassName('sideBar')[0]);
        if(sideBar.classList.contains('open')) {
            sideBar.classList.remove("open");
            sideBar.style.transform =  "translateX(-100%)";
            
        }else {
            sideBar.classList.add("open");
            sideBar.style.transform = "translateX(0%)";
        }
    }
    
    render() {
        return (
          <div className="App container">
            <div className="sideBar">
                <button className='hamburger-menu' onClick={this.toggleSideBar}><i className='fas fa-bars'></i>
                </button>
                <div className="menu-items">
                    <div className="section-header">Before Session</div>
                    <ul className="fa-ul">
                        <li><Link to="/settings"><i className="fa fa-cog"></i>Response Settings</Link></li>
                        <li><Link to="/"><i className="fa fa-users"></i>Audience Identification</Link></li>
                        <li><Link to="/"><i className="fa fa-tasks"></i>Survey</Link></li>
                        <li><Link to="/"><i className="fa fa-magic"></i>Edit Site Layout</Link></li>
                        <li><Link to="/"><i className="fa fa-mobile"></i>Response Website</Link></li>
                    </ul>
                    
                    <div className="section-header">During Session</div>
                    <ul className="fa-ul">
                        <li><Link to="/"><i className="fa fa-comments"></i>Individual Responses</Link></li>
                        <li><Link to="/"><i className="fa fa-check"></i>Message Filter</Link></li>
                    </ul>
                    
                    <div className="section-header">After Session</div>
                    <ul className="fa-ul">
                        <li><Link to="/"><i className="fa fa-chart-bar"></i>Presentation Results</Link></li>
                        <li><Link to="/"><i className="fa fa-tasks"></i>Survey Results</Link></li>
                    </ul>
                    
                    <div className="section-header">About</div>
                    <ul className="fa-ul">
                        <li><Link to="/"><i className="fa fa-file-powerpoint"></i>How It Works</Link></li>
                        <li><Link to="/"><i className="fa fa-tachometer-alt"></i>Dashboard</Link></li>
                        <li><Link to="/"><i className="fa fa-info-circle"></i>Sendsteps</Link></li>
                    </ul>
                    
                    <div className="section-header">Super Admin</div>
                    <ul className="fa-ul">
                        <li><Link to="/"><i className="fa fa-language"></i>Translations</Link></li>
                        <li><Link to="/"><i className="fa fa-magic"></i>Edit Dashboard Layout</Link></li>
                        <li><Link to="/phonenumbers"><i className="fa fa-phone"></i>Phonenumbers</Link></li>
                        <li><Link to="/"><i className="fa fa-envelope"></i>Session Overview</Link></li>
                        <li><Link to="/"><i className="fa fa-trash"></i>Delete Users</Link></li>
                    </ul>
                </div>

                
            </div>
            <Routes />
          </div>
        );
    }
}

export default App;



