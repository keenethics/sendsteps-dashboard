export function particleJSParams() {
    return {
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
				"onresize": {
					"enable": true,
					"density_auto": false,
					"density_area": 400 
				},
				"resize": false
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
}