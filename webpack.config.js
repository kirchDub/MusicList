var webpack = require('webpack');
var { resolve } = require('path');
module.exports = {
    context: resolve(__dirname, 'src'),
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://127.0.0.1:8080',
        'webpack/hot/only-dev-server',
        './index.jsx'
    ],
    output: {
        filename: 'build.js',
        path: resolve(__dirname, 'public', 'javascripts'),
        publicPath: '/javascripts/',
    },
    devServer: {
        hot: true,
        contentBase: resolve(__dirname, ''),
        publicPath: '/javascripts/',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|public\/)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }    
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]

}