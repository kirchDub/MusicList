var webpack = require('webpack');
var path = require('path');
module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/only-dev-server',
        './src'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    //resolve: {
    //    modulesDirectories: ['node-modules', 'src'],
    //    extensions: ['', '.js']
   // },
    module: {
        loaders: [
        {
            test: /\.js?$/,
            exclude: /(node_modules)/,
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