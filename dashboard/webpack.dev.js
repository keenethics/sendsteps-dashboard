const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const serverPort = process.env.APP_PORT || 3001;
const serverHost = process.env.APP_HOST || 'localhost';

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: process.env.WEB_PORT || 3000,
        historyApiFallback: true,
        proxy: {
          '/api': `http://${serverHost}:${serverPort}`,
        },
        contentBase: './build'
    }
});
