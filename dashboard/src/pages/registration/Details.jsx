import Particles from 'react-particles-js';
import React, { Component } from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import PasswordResetForm from './PasswordResetForm';
import { Redirect } from 'react-router-dom';

class RegistrationOverview extends Component {
  
    render(){
        let particleParams = {
            "particles": {
              "number": {
                "value": 150,
                "density": {
                  "enable": false,
                  "value_area": 0
                }
              },
              "color": {
                "value": "#5fa2d4"
              },
              "shape": {
                "type": "circle",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 3
                },
              },
              "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                  "enable": true,
                  "speed": 0.05,
                  "opacity_min": 0.25,
                  "sync": false
                }
              },
              "size": {
                "value": 3,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 5,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": true,
                "distance": 50,
                "color": "#ffffff",
                "opacity": 0.25,
                "width": 0
              },
              "move": {
                "enable": true,
                "speed": 0.5,
                "direction": "top-right",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                  "enable": false,
                  "rotateX": 1000,
                  "rotateY": 3500
                }
              }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                  "onhover": {
                    "enable": true,
                    "mode": "grab"
                  },
                  "onclick": {
                    "enable": true,
                    "mode": "push"
                  },
                  "resize": true
                },
                "modes": {
                  "grab": {
                    "distance": 50,
                    "line_linked": {
                      "opacity": 1
                    }
                  },
                  "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                  },
                  "repulse": {
                    "distance": 50,
                    "duration": 0.4
                  },
                  "push": {
                    "particles_nb": 4
                  },
                  "remove": {
                    "particles_nb": 2
                  }
                }
              },
            "retina_detect": true
		}

		const { currentView, isAuthorized } = this.props;

		if(isAuthorized) {
			// User is already authorized
			// and does not need to login again
    		return <Redirect
                  to={'/'}
               />
		}

		let currentPage = <LoginForm />
		
		if(currentView === 'SIGNUP') {
			currentPage = <RegistrationForm />;
		} 
		else if (currentView === 'RECOVER') {
			currentPage = <PasswordResetForm />;
		}

		return (
			<div>
				<Particles className="particles" width={document.body.clientWidth} height={document.body.clientHeight} params={particleParams} />
				{currentPage}
			</div>
		)
    };
}

export default connect(
    (state) => {
        return {
			currentView: state.appReducer.currentView,
			isAuthorized: state.authReducer.isAuthorized,
        }
    }
) (RegistrationOverview);