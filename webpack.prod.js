'use strict'

const MinifyPlugin = require('babel-minify-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {resolve} = require('path')

const config = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: '[hash].js',
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.webmanifest$/,
                use: [
                    'file-loader',
                ]
            }, {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./node_modules']
                        }
                    },
                ],
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {removeAll: true},
                        },
                    ],
                },
            }),
            new MinifyPlugin({}, {comments: false}),
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new MiniCssExtractPlugin({
            filename: '[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                includeAutoGeneratedTags: false,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                sortAttributes: true,
                sortClassName: true,
            },
        }),
    ],
}

module.exports = config