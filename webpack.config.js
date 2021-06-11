const webpack = require('webpack')
const TimePlugin = require('./custom-plugin/time-plugin')

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    devtool: false,
    plugins: [new TimePlugin()],
}