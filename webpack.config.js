var path = require('path');
var webpack = require('webpack');
var path = require('path');
var DIST_DIR   = path.join(__dirname, 'dist'),  
    CLIENT_DIR = path.join(__dirname, 'src'); 
 
module.exports = {
    context: CLIENT_DIR,
    entry: './app.jsx',
    output: { 
        path: DIST_DIR, 
        filename: 'bundle.js' 
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2016', 'react']
                }
            }
        ]
    },
};