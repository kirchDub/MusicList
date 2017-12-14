var webpack = require('webpack');
var { resolve } = require('path');
module.exports = {
    context: resolve(__dirname, 'src'),
    entry: [
        'react-hot-loader/patch',
        'react-hot-loader/babel',
        'webpack-hot-middleware/client',
        './index.jsx',
    ],
    output: {
        filename: 'build.js',
        path: '/',
        publicPath: '/javascripts',
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
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]

}