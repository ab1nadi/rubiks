const path = require('path');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: 
  {
    filename: "app.js",
    path: path.resolve(__dirname, 'docs'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },

    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
  
};