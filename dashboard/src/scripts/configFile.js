

export function getConfigFile(key) {
    const env = process.env.NODE_ENV; // 'development' or 'production'

    const development = {
        app: {
            port: 3000
        },
        db: {
            host: 'localhost',
            port: 27017,
            name: 'db'
        }
    };

    const production = {
        app: {
            port: 3000
        },
        db: {
            host: 'localhost',
            port: 27017,
            name: 'test'
        }
    };

    const config = {
        development,
        production
    };

    return config[env][key];
}

        console.log(process.env.NODE_ENV);