'use strict'

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        port: 8000,
    },
    devtool: 'eval-source-map',
    module: {
        rules: [{
            test: /\.(scss|sass)$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        sourceMap: true,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: ['node_modules'],
                        sourceMap: true,
                    },
                },
            ],
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader',
        }],
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'static/**/*',
            flatten: true,
        }]),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
    ],
}

module.exports = config
