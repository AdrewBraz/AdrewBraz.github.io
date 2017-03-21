'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: "./js/script.js",
    output: {
        path: __dirname + "/js",
        filename: "scripts.min.js"
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },

    plugins: [],

    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : false

}

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}