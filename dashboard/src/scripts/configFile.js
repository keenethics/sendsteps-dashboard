export function getConfigSetting(key) {
    let env = process.env.NODE_ENV; // 'development' or 'production'
    
    //Move to config file - Start
    let development = {
        apiUrlNova: 'http://local-nova.sendsteps.com',
        apiUrlBastet: 'http://local-bastet.sendsteps.com',
    };

    let production = {
        apiUrlNova: 'http://nova-api.dev.sendc.com',
        apiUrlBastet: 'http://bastet-api.dev.sendc.com',
        
    };
    //Move to config file - End


    let config = {
        development,
        production
    };
    
    if (typeof config[env][key] !== 'undefined') {
        return config[env][key];
    } else {
        //Return some error
    }
}