const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './test/index.js',
  output: {
    path: path.join(__dirname, 'test'),
    filename: 'test.build.js'
  },
  target: 'node',
  externals: [nodeExternals()],
};
