var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
			},
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, 'src/'),
		}
	},
	plugins: [new HtmlWebpackPlugin({
		template: path.resolve('./src/index.html'),
	})],
	devServer: {
		// contentBase: "./build",
		historyApiFallback: true
	},
	externals: {
		// global app config object
		config: JSON.stringify({
			apiUrl: 'http://localhost:4000'
		})
	}
}