import React, { Component } from 'react';
import Routes from './Routes';
import SideMenu from './components/menu/SideMenu';
import Header from './components/menu/Header';
// import { Redirect } from 'react-router-dom';
import RegistrationOverview from './pages/registration/Details';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = { authorized: [] };
    }
    
    checkLoggin() {

        fetch('http://local-bastet.sendsteps.com/index.php',{
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }).then(res => {
            // console.log(res);
            return res.json()
        }).then((result) => {
                console.log(result);
                this.setState({result});  
                
            }
        )
        
        
        // if (!sessionStorage.getItem('loggedintoken') || sessionStorage.getItem('loggedintoken') === '') {
        //     // return false
        // } 
        // return true 
    }
    
    componentDidMount(){
        this.checkLoggin();
    }
    
    render() {
        
        const { authorized }  = this.state;
        console.log(authorized);
        console.log('Pre: '+this.authorized);
        if(this.loggedIn !== true && this.loggedIn != undefined) {
            console.log('Post: '+this.loggedIn);
            //If not logged in, render login page
            return <RegistrationOverview />;
        } else {
            //Try to route to the requested page
            return (
                <div className="App">
                    {/* {loggedIn} */}
                    <Header />
                    <div className="wrapper">
                        <SideMenu />
                        <div className="view">
                            <Routes />
                        </div>
                    </div>
                </div>
            );     
        }
    }
}
export default App;