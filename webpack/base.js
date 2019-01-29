const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnext = require('postcss-cssnext');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_PATH = path.resolve(__dirname, '../');
const APP_SRC = path.join(APP_PATH, '/src');


const env = process.env.NODE_ENV;

const APP_DIST = path.join(APP_PATH, './dist');

module.exports = {
    devtool: '#eval-source-map',
    entry: {
        app: [path.join(APP_SRC, "/main.js")],
        vendors: [
            'vue',
            'vuex',
            'vue-router',
            'axios',
        ],
    },
    output: {
        publicPath: './',
        path: APP_DIST,
        filename: '[name].js',
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            app_src: APP_SRC,
            app_component: 'app_src/component',
            app_assets: 'app_src/assets',
            app_config: 'app_src/config',
            app_view: 'app_src/view'
        },
        extensions: ['.js', '.json', '.vue', '.less', '.css']
    },
    module: {
        loaders: [{
                test: /\.vue$/,
                use: [{
                        loader: 'vue-loader',
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /^node_modules$/,
                loader: 'url-loader?limit=1000&name=img/[name].[ext]',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                exclude: /\-enclude\.svg$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?importLoaders=1!postcss-loader',
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader?importLoaders=1!postcss-loader!less-loader',
            },
            {
                test: /\.svg$/,
                loader: 'raw-loader'
            },
            {
                test: /\.js$/,
                include: APP_SRC,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', {
                                modules: false
                            }]
                        ]
                    }
                }]
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: 'vendor.js',
        }),
        new htmlWebpackPlugin({
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            favicon: path.join(APP_SRC, '/assets/images/ico.ico'),
            template: path.join(APP_SRC, '/template/index.html'),
        }),
        new CopyWebpackPlugin([{
                from: path.join(APP_SRC, '/static/ueditor/'),
                to: './static/ueditor/'
            },
            {
                from: path.resolve(__dirname, '../src/assets/copyassets/'),
                to: path.resolve(__dirname, APP_DIST + "/copyassets/"),
            }
        ]),
        new webpack.DefinePlugin({
            __ENV__: JSON.stringify(process.env.NODE_ENV),
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return [cssnext({
                        browsers: [
                            "> 1%",
                            "last 2 versions",
                            "not ie <= 8"
                        ]
                    })];
                },
            },
            vue: {
                postcss: function() {
                    return [cssnext({
                        browsers: [
                            "> 1%",
                            "last 2 versions",
                            "not ie <= 8"
                        ]
                    })];
                },
            }
        }),
    ],
};