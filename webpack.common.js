'use strict'

const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
    entry: './src/script.js',
    output: {
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
    ],
}

module.exports = config