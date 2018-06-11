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
                <h2>Test</h2>
                <Navbar.Brand>
                  <Link to="/">Dashboard</Link>
                </Navbar.Brand>
                <Navbar.Brand>
                  <Link to="/login">Session Overview</Link>
                </Navbar.Brand>
                <Navbar.Brand>
                  <Link to="/signup">Phonenumbers</Link>
                </Navbar.Brand>
            </side-nav>
            <Routes />
            <button onClick={this.toggleMenu}><i className='fas fa-bars'></i>
            </button>
          </div>
        );
    }
}

export default App;



