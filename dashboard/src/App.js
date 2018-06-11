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
import {SideMenu} from 'react-sidemenu';

console.log(React.version);
class App extends Component {
    render() {
        return (
          <div className="App container">
            <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/">Dashboard</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <NavItem href="/signup">Signup</NavItem>
                  <NavItem href="/login">Login</NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Routes />
          </div>
        );
      }
}

export default App;



