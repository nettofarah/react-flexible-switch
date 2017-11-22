var path = require('path')

module.exports = {
  entry: {
    example: ['./example/example.js']
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'example'),
    publicPath: '/example',
    filename: 'bundle.js'
  }
}
