'use strict'

const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: '[contenthash].js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [{
            test: /\.(scss|sass)$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                    },
                },
                'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: ['node_modules'],
                    },
                },
            ],
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader',
        }],
    },
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        {
                            discardUnused: true,
                            mergeIdents: true,
                            reduceIdents: true,
                        },
                    ],
                },
            }),
            new MinifyPlugin({}, {
                comments: false,
            }),
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            from: 'static/**/*',
            flatten: true,
        }]),
        new MiniCssExtractPlugin({
            filename: '[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
    ],
}

module.exports = config
