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
			},
			{
				test: /\.(jpe?g|gif|png|svg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@components': path.resolve(__dirname, 'src/components/'),
			'@helpers': path.resolve(__dirname, 'src/shared/helpers'),
			'@models': path.resolve(__dirname, 'src/shared/models'),
			'@public': path.resolve(__dirname, 'src/assets'),
			'@services': path.resolve(__dirname, 'src/shared/services'),
			'@utils': path.resolve(__dirname, 'src/shared/utils'),
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