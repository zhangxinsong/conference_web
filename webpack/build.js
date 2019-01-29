var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require("./base.js");

// config.plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//         minimize: true,
//         compress: {
//             warnings: false,
//             drop_debugger: true,
//             drop_console: true
//         }
//     })
// );

// module.exports = merge(config, {
//     devtool: false
// });


config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
);

module.exports = merge(config, {});