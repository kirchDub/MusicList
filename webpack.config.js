var webpack = require('webpack');
var path = require('path');
module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'public', 'javascripts'),
        filename: 'build.js'
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