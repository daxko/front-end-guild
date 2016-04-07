module.exports = {
  entry: './js/main.jsx',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }]
  },
  output: {
    filename: 'js/global.js'
  }
};