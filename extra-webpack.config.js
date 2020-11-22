const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_USERNAME: JSON.stringify(process.env.API_USERNAME),
        API_PASSWORD: JSON.stringify(process.env.API_PASSWORD)
      }
    })
  ]
}
