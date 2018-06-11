// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;






import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import 'side-nav';



  
class App extends Component {
    toggleMenu(){
        document.querySelector('side-nav').toggle();
    }
    render() {
        return (
          <div className="App container">
            <side-nav toggle>
                <button className='hamburger-menu' onClick={this.toggleMenu}><i className='fas fa-bars'></i>
                </button>
                
                <h2>Before Session</h2>
                <Link to="/">Response Settings</Link><br/>
                <Link to="/">Audience Identification</Link><br/>
                <Link to="/">Survey</Link><br/>
                <Link to="/">Edit Site Layout</Link><br/>
                <Link to="/">Response Website</Link><br/>
                
                <h2>During Session</h2>
                <Link to="/">Individual Responses</Link><br/>
                <Link to="/">Message Filter</Link><br/>
                
                <h2>After Session</h2>
                <Link to="/">Presentation Results</Link><br/>
                <Link to="/">Survey Results</Link><br/>
                
                <h2>About</h2>
                <Link to="/">How It Works</Link><br/>
                <Link to="/">Dashboard</Link><br/>
                <Link to="/">Sendsteps</Link><br/>
                
                
                
                <h2>Super Admin</h2>
                <Link to="/">Translations</Link><br/>
                <Link to="/">Edit Dashboard Layout</Link><br/>
                <Link to="/">Phonenumbers</Link><br/>
                <Link to="/">Session Overview</Link><br/>
                <Link to="/">Delete Users</Link><br/>

                
            </side-nav>
            <Routes />
          </div>
        );
    }
}

export default App;



