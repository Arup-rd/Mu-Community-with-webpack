const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const Client = path.resolve(__dirname, 'client');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/public/index.html",
});


module.exports = {

  // mode: 'development',
  entry: `${Client}/src/index.js`,

  output: {
    path: `${Client}/build`,
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
      query: { compact: false }
    },
    {
      test: /\.(css)$/,
      use: [
        'style-loader',
        'css-loader',
      ]
    },
    {
      test: /\.(png|ico|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {}
        }
      ]
    }

    ]
  },

  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: './client/build',
    port: 8080,
    proxy: { "/api/**": { target: 'http://localhost:5000', secure: false } }
  },
  plugins: [htmlPlugin]
};