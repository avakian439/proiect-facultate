const path = require('path');
const HtmlPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',

    context: path.join(__dirname, 'src'),
    entry: './app.js',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true,
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
plugins: [
    new CopyWebpackPlugin({
        patterns: [
        { from: 'assets/',to:'assets/'}],
    }),

    new HtmlPlugin({
        file:path.join(__dirname,'dist','index.html'),
        template:'./index.html'
    })
],
module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {

            test: /\.(woff|woff2|eot|ttf|otf)$/i,
    
            type: 'asset/resource',
    
        },
    ],
},
};