'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'eval-source-map',
    devServer: {
        host: '0.0.0.0',
    },
    module: {
        rules: [
            {
                test: /\.webmanifest$/,
                use: [
                    'file-loader',
                    'webmanifest-loader',
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({template: 'src/index.html'}),
    ],
}

module.exports = config