const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const ip = require('internal-ip')
const portFinderSync = require('portfinder-sync')

const port = portFinderSync.getPort(3000)

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    host: 'local-ip',
    port,
    https: true,
    open: true,
    static: {
      directory: path.join(__dirname, 'static'),
      watch: true
    },
    client: {
      overlay: true,
      logging: 'none'
    },
    onAfterSetupMiddleware(server) {
      const protocol = server.options.https ? 'https' : 'http'
      const ipAddr = ip.v4.sync()
      console.log(`\nApp running at:\n - ${protocol}://${ipAddr}:${port}\n - ${protocol}://localhost:${port}\n`)
    }
  }
})
