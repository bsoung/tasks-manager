var webpack = require('webpack');
var path = require('path');
// var LodashPlugin = require('lodash-webpack-plugin');

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		filename: 'public/build/bundle.js',
		sourceMapFilename: 'public/build/bundle.map'
	},
	devtool: '#source-map',
	plugins: process.env.NODE_ENV === 'production' ? [
		// new LodashPlugin,
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: true
			}
		})
	] : [],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules!bower_components)/,
				loader: 'babel-loader',
				query: {
					plugins: ['lodash'],
					presets: ['react', 'es2015']
				}
			}
		]
	}
}