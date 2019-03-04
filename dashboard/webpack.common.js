const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'sst_bundle.js',
        chunkFilename: 'sst_chunk_[id].js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                resolve: {
                    extensions: ['.js', '.jsx'],    // Detect js & jsx files
                },
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: [
                            "@babel/plugin-syntax-dynamic-import",
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            },
            {
                test: /\.scss?$/,
                use: [
                    "style-loader",                 // creates style nodes from JS strings
                    "css-loader",                   // translates CSS into CommonJS
                    "sass-loader"                   // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.css?$/,
                use: [
                    "css-loader",                   // translates CSS into CommonJS
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    node: {
        fs: "empty"
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new Dotenv({
            path: './.env', // Path to .env file (this is the default)
            safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
        }),
    ],
};
