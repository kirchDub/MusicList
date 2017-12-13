const webpack = require('webpack');
//const path = require('path');


module.exports = {
    //devtool: 'inline-source-map',
    entry: {
        //'webpack-dev-server/client?http://127.0.0.1:8080/',
        //'webpack/hot/only-dev-server',
        'javascripts/build.js': './src/index.jsx'
    },
    output: {
        filename: '[name]',
        path: path.join(__dirname, 'public')
    },
    resolve: {
    //    modulesDirectories: ['node-modules', 'src'],
          extensions: ['.js', '.jsx'],
    },
    module: {
        loaders: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|public\/)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2017']
            }
        }    
        ]
    }

}